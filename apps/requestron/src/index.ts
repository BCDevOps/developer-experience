import { Application, Context } from 'probot'
import { setEstimate } from './lib/estimate' // eslint-disable-line no-unused-vars

export = (app: Application) => {

  app.on('issues.opened', issueOpened);

  async function issueOpened(context: Context) {
    try {
      //const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
      //await context.github.issues.createComment(issueComment)
      const repoNumber = context.repo()
      console.log(repoNumber)
      await setEstimate()
    } catch (err) {
      throw Error('Unable to handle issue')
    }
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
