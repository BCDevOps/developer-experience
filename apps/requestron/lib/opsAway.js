require('probot');

/**
 * Create a comment on service unavailability
 */

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

