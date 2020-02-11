require('probot');
const setEstimate = require('./estimate');
const setSwimlane = require('./swimlane');
const setMilestone = require('./milestone');
const createClosingComment = require('./closeComment');

module.exports = (app) => {

  app.on('issues.opened', issueOpened);
  app.on('issues.closed', issueClosed);

  async function issueOpened(context) {
    try {

      const newIssue = context.issue();

      //set the estimate at 0.5 for each new ticket.
      await setEstimate(context);

      //update the milestone to the most recent one for each new ticket.
      //await setMilestone(context);

      //set the swimlane in Zenhub to Operations
      //await setSwimlane(newIssue.number)

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

  async function issueClosed(context) {
    try {

      const closedIssue = context.issue()

      await createClosingComment(context)

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

}
