require('probot');
const createScheduler = require('probot-scheduler');
const setTicketCount = require('./ticketCount');
const setSwimlane = require('./swimlane');
const setMilestone = require('./milestone');
const createClosingComment = require('./closeComment');
const averageTime = require('./averageTime');
const onboardingComment = require('./onboarding');
const checkNeedsResponse = require('./needsResponse');
const checkStaleness = require('./staleIssue');
const setEstimate = require('./estimate');
const opsAwayComment = require('./opsAway');

module.exports = (app) => {

  createScheduler(app, {
    delay: 0,
    interval: 60 * 60 * 1000 //every hour
  });

  app.on('issues.opened', issueOpened);
  app.on('issues.closed', issueClosed);
  app.on('schedule.repository', scheduleTriggered);

  async function issueOpened(context) {
    try {

      const newIssue = context.issue();

      // track number of tickets on ops-controller
      // await setTicketCount(context);

      // add estimate on ZenHub
      await setEstimate(context);

      // update the milestone to the most recent one for each new ticket.
      await setMilestone(context);

      // set the swimlane in Zenhub to Operations
      await setSwimlane(newIssue.number);

      // create a link to the Onboarding Journey for new project sets
      await onboardingComment(context);

      // create a message for service unavailability
      // await opsAwayComment(context, 'next Monday');

      console.log("new issue #" + newIssue.number  + " updated")

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
      // await averageTime(context);

      console.log("closed issue #" + closedIssue.number  + " updated")

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

  async function scheduleTriggered(context) {
    try {

      //check which tickets have been most recently commented-on by a non-platform-ops user, and mark for needing response
      await checkNeedsResponse(context);

      //mark for issue staleness after 1 week of no response from the client.
      await checkStaleness(context);

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

};
