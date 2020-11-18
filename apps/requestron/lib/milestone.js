const axios = require('axios');
const createJWT = require('./jwt.js');

/**
 * Set the milestone in github to the most recent one
 */

module.exports = async function setMilestone(context) {

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

        //get the list of milestones in the devops-requests repo.
        const get_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/milestones');
        const milestones = get_response["data"];
        let most_recent_milestone = milestones[0];

        //figure out which milestone is the most recent one (based on due date).
        //we normally only have the one milestone active at a time anyway, but just in case.
        for (let i = 0; i < milestones.length; i++) {
            let milestone = milestones[i];
            if (milestone["state"] === 'open' && milestone["due_on"] > most_recent_milestone["due_on"]) {
                most_recent_milestone = milestone
            }
        }

        //update the issue to have the most recent milestone.
        const issueMilestone = context.issue({milestone: most_recent_milestone["number"]});
        await context.github.issues.update(issueMilestone);
        return true;

    } catch (err) {

        throw Error('Unable to handle issue in milestone: ' + err)

    }
};
