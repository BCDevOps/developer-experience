import { Context } from 'probot'
/**
 * Create a comment on close that includes some useful instructions/details
 */

export async function createClosingComment(context: Context) {
    try {

        const closingIssue = context.issue()
        const issueComment = context.issue({ body: 'This issue has now been closed. It has been completed, ' +
                'unless a comment indicates otherwise. If you have requested access to either Openshift or the bcgov ' +
                'github org, remember that you must accept the invitation before access will be available! If you have ' +
                'additional problems or questions, please feel free to ask on RocketChat on the #devops-howto channel!' })
        await context.github.issues.createComment(issueComment)
        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};

