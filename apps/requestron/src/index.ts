import { Application, Context } from 'probot'
import { setEstimate } from './lib/estimate'
import { setMilestone } from "./lib/milestone";

export = (app: Application) => {

  app.on('issues.opened', issueOpened);

  async function issueOpened(context: Context) {
    try {

      const newIssue = context.issue()

      //set the estimate at 0.5 for each new ticket.
      await setEstimate(newIssue.number)

      //update the milestone to the most recent one for each new ticket.
      await setMilestone(context)

    } catch (err) {

      throw Error('Unable to handle issue: ' + err)

    }
  }
}
