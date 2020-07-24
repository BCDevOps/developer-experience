require('probot');
const axios = require('axios');
/**
 * Create a comment on service unavailability
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function createOpsAwayComment(context, backDate = 'tomorrow') {
    try {
        let commentContent = `Thank you for the request! Please note that we are currently away and will be back ${backDate}. All new requests will be handled by then.`;

        const issueComment = context.issue({ body: commentContent });
        await context.github.issues.createComment(issueComment);

        return true;
    } catch (err) {
        throw Error(`Unable to post away message for new requests: ${err}`);
    }
};

