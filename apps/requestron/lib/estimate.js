const axios = require('axios');
require('probot');
/**
 * Set the Estimate in Zenhub to 0.5
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function setEstimate(context) {
    try {

        const openingIssue = context.issue();
        const issueUrl = 'https://github.com/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + openingIssue.number;
        const getResponse = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues?labels=ops-controller');
        const controllerIssueNumber = getResponse.data[0].number;
        const contollerIssueComment = { body: issueUrl };
        const postResponse = await instance.post('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + controllerIssueNumber + '/comments', contollerIssueComment);
        //console.log(postResponse)

        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};

