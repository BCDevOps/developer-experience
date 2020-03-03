const axios = require('axios')
/**
 * Set the milestone in github to the most recent one
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

export async function setMilestone(context: any) {
    try {

        //get the list of milestones in the devops-requests repo.
        const get_response = await instance.get('repos/bcdevops/devops-requests/milestones')
        const milestones = get_response["data"]
        let most_recent_milestone = milestones[0]

        //figure out which milestone is the most recent one (based on due date).
        //we normally only have the one milestone active at a time anyway, but just in case.
        for (let i = 0; i < milestones.length; i++) {
            let milestone = milestones[i]
            if (milestone["state"] == 'open' && milestone["due_on"] > most_recent_milestone["due_on"]) {
                most_recent_milestone = milestone
            }
        }

        //update the issue to have the most recent milestone.
        const issueMilestone = context.issue({milestone: most_recent_milestone["number"]})
        await context.github.issues.update(issueMilestone)
        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};
