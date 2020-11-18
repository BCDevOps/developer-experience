require('probot');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { createAppAuth } = require('@octokit/auth-app');
/**
 * Check for issue staleness
 */

// let instance = axios.create({
//   baseURL: 'https://api.github.com/',
//   timeout: 10000,
//   headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
// });

module.exports = async function checkNeedsResponse(context) {

    let payload = {
      iat: Date.now() * 1000,
      exp: Date.now() * 1000 + (60 * 10), //lasts 10 minutes
      iss: process.env.APP_ID
    };

    // let buff = new Buffer(process.env.PRIVATE_KEY, 'base64');
    // let key = buff.toString('ascii');
    // console.log(key);
    // console.log(payload);
    // let token = jwt.sign(payload, key);

    let token = await createJWT();
    let instance = axios.create({
        baseURL: 'https://api.github.com/',
        timeout: 10000,
        headers: {
          authorization: `bearer ${token}`,
          accept: 'application/vnd.github.machine-man-preview+json'
        }
    });

    try {

        // get a list of open issues in the repo
        const issue_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues');
        const issues = issue_response["data"];
        console.log("gets issues");

        // get a list of team members
        let team_members = [];
        if (process.env.ENV == 'prod'){
            const team_response = await instance.get('/orgs/' + process.env.OPS_TEAM_ORG + '/teams/' + process.env.OPS_TEAM_NAME + '/members');
            const team = team_response["data"];
            for (let i in team) {team_members.push(team[i].login)}
        } else {
            team_members.push("caggles");
        }
        console.log("gets team members");

        //for each open issue, check the most recent comment
        for (let i in issues) {

            let comment_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/comments');
            let comments = comment_response["data"];

            //make a nice little list of the current labels
            let current_labels=[];
            for (let j in issues[i].labels) {current_labels.push(issues[i].labels[j].name)}

            //get  the most recent comment
            let recent_comment = comments[issues[i].comments - 1];

            if (recent_comment !== undefined) {

                //if the most recent comment is from an ops team member (or is excluded from staleness tracking) and the client-response label is on the ticket, remove the client-response label
                if ((team_members.includes(recent_comment.user.login) || current_labels.includes('staleness-exception')) &&
                    current_labels.includes('client-response')) {
                    await instance.delete('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels/client-response')

                } else if (!current_labels.includes('staleness-exception') &&
                    !current_labels.includes('client-response') &&
                    !team_members.includes(recent_comment.user.login)) {
                    // add client-response to the list of labels and push the whole list.
                    current_labels.push('client-response');
                    await instance.put('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels', {labels: current_labels})

                }

            }
        }

        return true;
    } catch (err) {
        throw Error(`Unable to check which tickets need a response: ${err}`);
    }
};

async function createJWT() {

    let buff = new Buffer(process.env.PRIVATE_KEY, 'base64');
    let key = buff.toString('ascii');
    const auth = createAppAuth({
        appId: process.env.APP_ID,
        privateKey: key,
        installationId: process.env.INSTALLATION_ID,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_TOKEN
    });

  const { token } = await auth({ type: 'installation' });
  return token;
}
