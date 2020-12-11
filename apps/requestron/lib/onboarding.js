require('probot');
const axios = require('axios');
const createJWT = require('./jwt.js');

/**
 * Create a comment on close that includes some useful instructions/details
 */

module.exports = async function createOnboardingComment(context) {

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
        let commentContent = 'Thank you for requesting a new Openshift Project Set! We look forward to having you on our platform!\n\n' +
            'If you\'re new to the platform (or even if you\'ve been around a while and just need a refresher!), please read over ' +
            'our [Onboarding Journey](https://developer.gov.bc.ca/Onboarding-Journey/Welcome-to-our-Platform-Community!). ' +
            'It outlines what we expect of you and what you can expect from us. Please take a look!';

        // add the unique closing comment lines for each appropriate label
        // this probably shouldn't result in multiple lines at the moment, but just in case we want to add different stuff for the "approved" vs "rejected" labels later.
        for (let i = 0; i < getResponse.data.length; i++) {
            if (getResponse.data[i]['name'] == 'openshift-project-set') {
                const issueComment = context.issue({ body: commentContent });
                await context.github.issues.createComment(issueComment);
            }
        }

        // post the closing comment
        return true;

    } catch (err) {

        throw Error('Unable to handle issue in closing comment: ' + err)

    }
};

