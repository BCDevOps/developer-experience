require('probot');
const axios = require('axios');
const createJWT = require('./jwt.js');

/**
 * Create a comment on close that includes some useful instructions/details
 */

const commentDetails = {
    'annotation-update': 'You can view your project annotations by running the command `oc describe namespace [namespace-name]`.',
    'artifactory-repo': 'You can find the custom resource for your repo in the listed tools namespace by running `oc get artifactoryrepos`. ' +
        'For information on the status of the resource, run `oc describe artifactoryrepo [repo-name]`.',
    'documize-space': 'You should expect to receive an invitation to your Documize space in your email inbox.',
    'duplicate': 'This task will not be completed because it is a duplicate of another task.',
    'github-membership': 'The invitation should appear in the relevant user\'s inbox very soon. Please ensure that they\'re checking the correct inbox. ' +
        'The invitation will show up in the inbox of whatever email address is listed as their primary address in their github profile. ' +
        'Please note that this request ONLY provides access to the `bcgov` and/or `bcgov-c` organizations. It does not provide access to Openshift. ' +
        'If you require that, please open another issue [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan&labels=openshift-access&template=openshift_user_access_request.md&title=)',
    'github-repo': 'Assuming this task was approved, you will find your new repo in bcgov-c with the requested name, unless otherwise indicated. ' +
        'The requested administrator of this repo will be the only one with access upon creation, and should add additional collaborators as required. ' +
        'If you need to add these additional collaborators to the bcgov-c org, please create another request [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan&labels=github-membership&template=github_user_access_request.md&title=)',
    'keycloak-realm': 'Please follow the instructions above to use realm-o-matic.',
    'openshift-access': 'The user in question should receive an invitation to the BCDevOps organization on GitHub. They must accept this invitation before they will be able to access Openshift. ' +
        'The invitation will show up in the inbox of whatever email address is listed as their primary address in their github profile.',
    'openshift-project-set': 'Assuming this request has been approved, your 3.11 project set has now been deleted. Congratulations on your migration to Openshift 4!',
    'quota-update': 'Assuming this request has been approved, the closure of this ticket means that the platform services team has submitted this change to be implemented on the platform by DXCAS. ' +
        'It is *not* completed yet, and you may need to wait for a while longer before you see the change in your namespace. ' +
        'If you are concerned by how long it is taking, please ask for further information on rocketchat. ' +
        '\n\nIf you have made this request for an OCP4 namespace, please be aware that this request has not been actioned. Please use the appropriate provisioning tool to make your request instead.',
    'new-request-type': 'Assuming this request has been approved, you will now find the new request type available for submissions. ' +
        'Please note that, if you require action on that new request type yourself, you will need to submit a request of that type as well - the closure of this ticket does not indicate anything beyond the existence of the new request type.'
};

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function createClosingComment(context) {

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

        const closingIssue = context.issue();
        const getResponse = await instance.get('repos/' + closingIssue.owner + '/' + closingIssue.repo + '/issues/' + closingIssue.number + '/labels');

        // make the common open statement of the closing comment
        let commentContent = 'This issue has now been closed. It has been completed, unless a comment indicates otherwise.\n';

        // add the unique closing comment lines for each appropriate label
        // this probably shouldn't result in multiple lines at the moment, but just in case we want to add different stuff for the "approved" vs "rejected" labels later.
        for (let i = 0; i < getResponse.data.length; i++) {
            let label = getResponse.data[i]['name'];
            if (commentDetails[label] != null) {
                commentContent += '\n' + commentDetails[label] + '\n';
            }
        }

        // add the comment closing statement of the closing comment
        commentContent += '\nIf you have additional problems or questions, please feel free to ask the community on RocketChat on the `#devops-howto` channel!';

        // post the closing comment
        const issueComment = context.issue({ body: commentContent });
        await context.github.issues.createComment(issueComment);
        return true;

    } catch (err) {

        throw Error('Unable to handle issue in closing comment: ' + err)

    }
};

