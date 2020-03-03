require('probot');
const axios = require('axios');
/**
 * Create a comment on close that includes some useful instructions/details
 */

const commentDetails = {
    'annotation-update': 'You can view your project annotations by running the command `oc describe namespace [namespace-name]`.',
    'artifactory-repo': 'You can find the custom resource for your repo in the listed tools namespace by running `oc get artifactoryrepos`.' +
        'For information on the status of the resource, run `oc describe artifactoryrepo [repo-name]`.',
    'documize-space': 'You should expect to receive an invitation to your Documize space in your email inbox.',
    'duplicate': 'This task will not be completed because it is a duplicate of another task.',
    'github-membership': 'The invitation should appear in the relevant user\'s inbox very soon. Please ensure that they\'re checking the correct inbox.' +
        'The invitation will show up in the inbox of whatever email address is listed as their primary address in their github profile.' +
        'Please note that this request ONLY provides access to the `bcgov` and/or `bcgov-c` organizations. It does not provide access to Openshift. ' +
        'If you require that, please open another issue [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan&labels=openshift-access&template=openshift_user_access_request.md&title=)',
    'keycloak-realm': 'Please follow the instructions above to use realm-o-matic.',
    'openshift-access': 'The user in question should receive an invitation to the BCDevOps organization on GitHub. They must accept this invitation before they will be able to access Openshift.' +
        'The invitation will show up in the inbox of whatever email address is listed as their primary address in their github profile.',
    'openshift-project-set': 'Assuming this task was approved, you will find your project set by logging into the Openshift console and navigating to the Application Console.' +
        'There, you will find a list of all projects to which you have access. The technical steward will have admin access and can add new users to the projects as required.'
};
const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function createClosingComment(context) {
    try {

        const closingIssue = context.issue();
        const getResponse = await instance.get('repos/' + closingIssue.owner + '/' + closingIssue.repo + '/issues/' + closingIssue.number + '/labels');
        let commentContent = 'This issue has now been closed. It has been completed, unless a comment indicates otherwise.\n';
        console.log(getResponse.data.length)
        for (let i = 0; i < getResponse.data.length; i++) {
            let label = getResponse.data[i]['name']
            console.log(label)
            if (commentDetails[label] != null) {
                commentContent += '\n' + commentDetails[label] + '\n';
            }
        }
        commentContent += '\nIf you have additional problems or questions, please feel free to ask the community on RocketChat on the `#devops-howto` channel!';

        const issueComment = context.issue({ body: commentContent});
        await context.github.issues.createComment(issueComment);
        return true;

    } catch (err) {

        throw Error('Unable to handle issue in closing comment: ' + err)

    }
};

