import { Application, Context } from 'probot'
import { setEstimate } from './lib/estimate'
import { setSwimlane } from './lib/swimlane'
import { setMilestone } from './lib/milestone'
import { createClosingComment } from './lib/closeComment';

export = (app: Application) => {

  app.on('issues.opened', issueOpened);
  app.on('issues.closed', issueClosed);

  async function issueOpened(context: Context) {
    try {

      const newIssue = context.issue()

      //set the estimate at 0.5 for each new ticket.
      await setEstimate(newIssue.number)

      //update the milestone to the most recent one for each new ticket.
      await setMilestone(context)

      //set the swimlane in Zenhub to Operations
      await setSwimlane(newIssue.number)

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

  async function issueClosed(context: Context) {
    try {

      const closedIssue = context.issue()

      await createClosingComment(context)

    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }

}
