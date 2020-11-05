#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs-extra');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Verify the current login session
 * @param {String} org org of the issue
 */
const verifyAuth = async (org) => {
  try {
    console.log('------starting-------');
    const session = await octokit.users.getAuthenticated();
    console.log(`You are using account: ${session.data.login}`);

    // verify GitHub Organization:
    const orgInfo = await octokit.orgs.get({
      org,
    });
    console.log(`GitHub Org: ${orgInfo.data.login}`);
  } catch (err) {
    throw err;
  }
};

/**
 * Get user events up to a date (GitHub api returns only up to three months)
 * @param {String} username GitHub username
 * @param {String} expiryDate the date to check up to
 */
const checkUserEvents = async (username, expiryDate) => {
  try {
    const userInfo = await octokit.activity.listEventsForAuthenticatedUser({
      username,
    });

    // Get the latest activity:
    // Note: if no activity for more than three months, there will be no last-modified
    const lastModified = userInfo.headers['last-modified'];
    const date = lastModified ? new Date(lastModified).getTime() : expiryDate;

    // Check for latest activity:
    if (date <= expiryDate) {
      console.log(`@${username}`);
      return {
        username,
        expired: true,
      };
    }
    return {
      username,
      expired: false,
    };
  } catch (err) {
    throw err;
  }
};

/**
 * Get list of usernames in the Ops GitHub team
 * @param {String} org GitHub Org to check
 * @param {String} teamName Team name
 */
const getOpsTeam = async (org, teamName) => {
  try {
    const teamMembers = await octokit.teams.listMembersInOrg({
      org,
      team_slug: teamName,
    });
    return teamMembers.data.map((user) => user.login);
  } catch (err) {
    throw err;
  }
};

/**
 * Get list of inactive users
 * @param {String} org GitHub Org to check
 * @param {String} expiryDate the date to check up to
 */
const getInactiveUsers = async (org, expiryDate) => {
  try {
    let totalUser = 0;
    let inactiveUser = 0;
    const inactiveUsers = [];

    const options = octokit.orgs.listMembers.endpoint.merge({
      org,
    });

    const orgMembers = await octokit.paginate(options);

    // Get event list for all users:

    for (let user of orgMembers) {
      totalUser++;
      const result = await checkUserEvents(user.login, expiryDate);
      if (result.expired) {
        inactiveUser++;
        inactiveUsers.push(result.username);
      }
    }
    return {
      totalUser,
      inactiveUser,
      inactiveUsers,
    };
  } catch (err) {
    throw Error(err);
  }
};

/**
 * Get the GitHub issue comments username
 * @param {String} owner org of the issue
 * @param {String} repo repo of the issue
 * @param {String} issueNumber number of the issue
 */
const getReactions = async (owner, repo, issueNumber) => {
  try {
    const comments = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: issueNumber,
    });
    return comments.data.map((c) => c.user.login);
  } catch (err) {
    throw err;
  }
};

/**
 * Add users to repo as collaborator
 * @param {String} org org of the issue
 * @param {String} repo repo of the issue
 * @param {String} username user to add
 */
const addRepoCollaborator = async (repo, username, org) => {
  try {
    await octokit.repos.addCollaborator({
      owner: org,
      repo: repo,
      username,
      permission: 'triage',
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllInactiveUsers = async (org, file, addCollaborator = false) => {
  try {
    // TODO: Get users without 2FA:

    // Get users inactive for three months:
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() - 3);
    console.log(`------Inactive Users since ${expiryDate}-------`);
    const result = await getInactiveUsers(org, expiryDate);

    // filter out the OPS team members:
    const opsTeamMember = await getOpsTeam(org, process.env.OPS_TEAM_NAME);
    const targetUsers = result.inactiveUsers.filter((user) => !opsTeamMember.includes(user));

    console.log(
      `------Total user count in org ${org} is ${result.totalUser}, there are ${result.inactiveUser} inactive users.------`,
    );
    await fs.outputFile(file, targetUsers);

    // adding users as Collaborator to notification repo:
    if (addCollaborator && process.env.BCDEVOPS_ISSUE_REPO && process.env.BCDEVOPS_ISSUE_OWNER) {
      console.log(
        `Adding users as Collaborator to notification repo ${process.env.BCDEVOPS_ISSUE_REPO}@${process.env.BCDEVOPS_ISSUE_OWNER}`,
      );
      targetUsers.forEach(async (u) => {
        await addRepoCollaborator(
          process.env.BCDEVOPS_ISSUE_REPO,
          u,
          process.env.BCDEVOPS_ISSUE_OWNER,
        );
      });
    }

    // get the users that have not yet replied to the ticket:
    if (
      process.env.BCDEVOPS_ISSUE_OWNER &&
      process.env.BCDEVOPS_ISSUE_REPO &&
      process.env.BCDEVOPS_ISSUE_ID
    ) {
      const repliedUsers = await getReactions(
        process.env.BCDEVOPS_ISSUE_OWNER,
        process.env.BCDEVOPS_ISSUE_REPO,
        process.env.BCDEVOPS_ISSUE_ID,
      );
      const deleteUsers = targetUsers.filter((user) => !repliedUsers.includes(user));

      console.log('The users that have replied:');
      console.log(repliedUsers);
      console.log('The users to be removed:');
      console.log(deleteUsers);
    }
  } catch (err) {
    console.error(err);
  }
};

const addUserToOrg = async (userId, org) => {
  try {
    const result = await octokit.orgs.addOrUpdateMembership({
      org,
      username: userId,
    });
    console.log(`Invited user ${userId} to ${org} with status ${result.status}`);
  } catch (err) {
    console.error(err);
  }
};

const checkUserExist = async (userId) => {
  try {
    // check if user exists
    const user = await octokit.users.getByUsername({
      username: userId,
    });
    if (user.status === 200) return 1;
    return 0;
  } catch (err) {
    return 0;
  }
};

const detectUserMembership = async (userId, org, autoInvite = false) => {
  try {
    // check if user in org
    const membership = await octokit.orgs.checkMembership({
      org,
      username: userId,
    });
    if (membership.status === 204) {
      console.log(`${userId} in ${org} is ${membership.status}`);
    }
  } catch (err) {
    // if not, add user
    console.log(`user ${userId} not in org yet`);

    if (err.status === 404 && autoInvite) {
      await addUserToOrg(userId, org);
    }
  }
};

const inviteUsersToOrg = async (inputFile, org, autoInvite = false) => {
  try {
    // read from the username list:
    const input = await fs.readFile(inputFile);
    const users = input.toString().split('\n');

    // if user exists, check membership, and invite
    users.forEach(async (i) => {
      const exist = await checkUserExist(i);
      if (exist) {
        await detectUserMembership(i, org, autoInvite);
      } else {
        console.warn(`-------------------User ${i} doesn't exist-----------`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const createRepo = async (repo, adminUser, org, expiryDate = null) => {
  try {
    const repo = await octokit.repos.createInOrg({
      org,
      name: repo,
      private: true,
      auto_init: true,
    });

    // console.info(repo);

    const user = await octokit.repos.addCollaborator({
      owner: org,
      repo: repo,
      username: adminUser,
      permission: 'admin',
    });

    // console.info(user);

    // Only private repo have expiry date:
    if (expiryDate) {
      const expiry = await octokit.repos.replaceTopics({
        owner: org,
        repo: repo,
        names: [expiryDate],
      });
    }

    return 0;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// Main:
(async () => {
  const org = process.env.GITHUB_OWNER;
  const inputFile = './input/invite_users.txt';
  const outputFile = './output/inactive_users.json';

  try {
    // Confirm current login session:
    // await verifyAuth(org);
    // check for inactive users:
    // const addCollaborator = false;
    // await getAllInactiveUsers(org, outputFile, addCollaborator);
    // invite new users:
    // await inviteUsersToOrg(inputFile, org, false);
    // create new private repo with admin user:
    // await createRepo('<repo_name>', '<username>', org, '<expiry-MM-YYYY>');
  } catch (err) {
    console.error(err);
  }
})();
