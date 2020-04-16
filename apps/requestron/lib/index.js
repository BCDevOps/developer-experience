require('probot');
const setEstimate = require('./estimate');
const setSwimlane = require('./swimlane');
const setMilestone = require('./milestone');
const createClosingComment = require('./closeComment');
const averageTime = require('./averageTime');
const onboardingComment = require('./onboarding')

module.exports = (app) => {

  app.on('issues.opened', issueOpened);
  app.on('issues.closed', issueClosed);

  async function issueOpened(context) {
    try {

      const newIssue = context.issue();

      // track number of tickets on ops-controller
      await setEstimate(context);

      // update the milestone to the most recent one for each new ticket.
      await setMilestone(context);

      // set the swimlane in Zenhub to Operations
      await setSwimlane(newIssue.number);

      // create a link to the Onboarding Journey for new project sets
      await onboardingComment(context);

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

  async function issueClosed(context) {
    try {

      const closedIssue = context.issue();

      // add a comment to every closed ops ticket explaining stuff
      await createClosingComment(context);

      // find the average time to close of all ops tickets and stick it on ops-controller
      await averageTime(context);

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

};
