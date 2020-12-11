const axios = require('axios');
require('probot');
const createJWT = require('./jwt.js');

/**
 * Adds links the new ticket to the relevant Epic
 */

const zenhubInstance = axios.create({
  baseURL: 'https://api.zenhub.io/',
  timeout: 10000,
  headers: {'X-Authentication-Token': process.env.ZENHUB_TOKEN}
});

module.exports = async function setEpic(context) {

    let token = await createJWT();
    let githubInstance = axios.create({
        baseURL: 'https://api.github.com/',
        timeout: 10000,
        headers: {
          authorization: `bearer ${token}`,
          accept: 'application/vnd.github.machine-man-preview+json'
        }
    });

    try {

        const openingIssue = context.issue();

        // get ops-controller ticket
        const getController = await githubInstance.get('repos/' + openingIssue.owner + '/' + process.env.SG_REPO_NAME + '/issues?labels=ops-controller&status=open');
        const controllerIssueNumber = getController.data[0].number;

        // create the post payload
        let payload = {
            "remove_issues": [],
            "add_issues": [
                { "repo_id": parseInt(process.env.REQUEST_REPO_ID), "issue_number": openingIssue.number }
            ]
        };
        console.log(payload);

        // post to the epic
        const postToEpic = await zenhubInstance.post('/p1/repositories/' + process.env.SG_REPO_ID + '/epics/' + controllerIssueNumber + '/update_issues', payload);

    } catch (err) {

        throw Error('Unable to handle adding issue to epic: ' + err)

    }
};

