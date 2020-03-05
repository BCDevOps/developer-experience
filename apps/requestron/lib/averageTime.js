const axios = require('axios');
require('probot');
/**
 * Adds link to new ticket in ops-controller
 * Calculates total number of ops tickets in ops-controller
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 100000, //100 seconds because this calculation can take a while when there are a lot of ops tickets.
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function setEstimate(context) {
    try {

        const closingIssue = context.issue();

        // get ops-controller
        const issueUrl = 'https://github.com/' + closingIssue.owner + '/' + closingIssue.repo + '/issues/' + closingIssue.number;
        const getController = await instance.get('repos/' + closingIssue.owner + '/' + closingIssue.repo + '/issues?labels=ops-controller&status=open');
        const controllerIssueNumber = getController.data[0].number;

        // get the body of ops-controller
        let controllerBody = getController.data[0].body.split('\n');

        // get total number of ops tickets in ops-controller
        const commentsURL = getController.data[0].comments_url;
        const getComments = await instance.get(commentsURL);

        let timeList = [];

        //go through all the closed tickets and find difference between open and close times
        for (let i = 0; i < getComments.data.length; i++) {
            let commentNumber = getComments.data[i].body.split('/');
            commentNumber = commentNumber[commentNumber.length - 1];
            let getIssue = await instance.get('repos/' + closingIssue.owner + '/' + closingIssue.repo + '/issues/' + commentNumber);
            let openTime = getIssue.data.created_at;
            let closeTime = getIssue.data.closed_at;
            if ( closeTime != null ) {
                openTime = Date.parse(openTime)/1000;
                closeTime = Date.parse(closeTime)/1000;
                let diffTime = closeTime - openTime;
                timeList.push(diffTime)
            }
        }

        let timeTotal = 0;
        console.log(timeList);
        for (let i = 0; i < timeList.length; i++) {
            timeTotal += timeList[i];
            timeList[i] = secondsToDhms(timeList[i]);
        }
        console.log(timeTotal);
        console.log(timeList);
        let timeAvg = timeTotal/timeList.length;
        timeAvg = secondsToDhms(timeAvg);
        console.log(timeAvg);


        // if the "avg time to close" line already exists, delete it
        for (let i = 0; i < controllerBody.length; i++) {
            if (controllerBody[i].includes('Average time to close')) {
                controllerBody.splice(i, 1);
            }
        }



        // add a new "number of tickets" line and update the body
        controllerBody.push('Average time to close: ' + timeAvg);
        controllerBody = controllerBody.filter(function(value, index, arr){return value != ''});
        controllerBody = controllerBody.join('\n');
        controllerBody = { body: controllerBody };
        const patchResponse = await instance.patch('repos/' + closingIssue.owner + '/' + closingIssue.repo + '/issues/' + controllerIssueNumber, controllerBody);

        return true;

    } catch (err) {

        throw Error('Unable to handle issue in average time: ' + err)

    }
};

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
