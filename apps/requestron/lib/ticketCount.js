const axios = require('axios');
require('probot');
const createJWT = require('./jwt.js');

/**
 * Adds link to new ticket in ops-controller
 * Calculates total number of ops tickets in ops-controller
 */

module.exports = async function setTicketCount(context) {

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

        const openingIssue = context.issue();

        // get ops-controller
        const issueUrl = 'https://github.com/' + openingIssue.owner + '/' + openingIssue.repo + '/issues/' + openingIssue.number;
        const getController = await instance.get('repos/' + openingIssue.owner + '/' + openingIssue.repo + '/issues?labels=ops-controller&status=open');
        const controllerIssueNumber = getController.data[0].number;

        // make comment to add to ops-controller
        const contollerIssueComment = { body: issueUrl };
        if (openingIssue.number != controllerIssueNumber){
            const postResponse = await instance.post('repos/' + openingIssue.owner + '/' + openingIssue.repo + '/issues/' + controllerIssueNumber + '/comments', contollerIssueComment);
        }

        // get total number of ops tickets in ops-controller
        const commentsURL = getController.data[0].comments_url;
        const getComments = await instance.get(commentsURL);

        // get the body of ops-controller
        let controllerBody = getController.data[0].body.split('\n');

        // if the "number of tickets" line already exists, delete it
        for (let i = 0; i < controllerBody.length; i++) {
            if (controllerBody[i].includes('Number of tickets')) {
                controllerBody.splice(i, 1);
            }
        }

        // add a new "number of tickets" line and update the body
        controllerBody.push('Number of tickets: ' + getComments.data.length);
        controllerBody = controllerBody.filter(function(value, index, arr){return value != ''});
        controllerBody = controllerBody.join('\n');
        controllerBody = { body: controllerBody };
        const patchResponse = await instance.patch('repos/' + openingIssue.owner + '/' + openingIssue.repo + '/issues/' + controllerIssueNumber, controllerBody);


        return true;

    } catch (err) {

        throw Error('Unable to handle issue in estimate: ' + err)

    }
};

