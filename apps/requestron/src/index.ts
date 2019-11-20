import { Application, Context } from 'probot'
import { setEstimate } from './lib/estimate'

export = (app: Application) => {

  app.on('issues.opened', issueOpened);

  async function issueOpened(context: Context) {
    try {
      //
      //const issueComment = context.issue({ body: 'Thank your for making your request. We will try and get back to you as soon as possible.' })
      //await context.github.issues.createComment(issueComment)

      const newIssue = context.issue()
      console.log(newIssue.number)
      await setEstimate(newIssue.number)
    } catch (err) {
      throw Error('Unable to handle issue: ' + err)
    }
  }
}
