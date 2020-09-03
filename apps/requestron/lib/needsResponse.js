require('probot');
const axios = require('axios');
/**
 * Check for issue staleness
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 10000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

module.exports = async function checkNeedsResponse(context) {
    try {

        // get a list of open issues in the repo
        const issue_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues');
        const issues = issue_response["data"];

        // get a list of team members
        const team_response = await instance.get('/orgs/' + process.env.OPS_TEAM_ORG + '/teams/' + process.env.OPS_TEAM_NAME + '/members');
        const team = team_response["data"];
        let team_members = [];
        for (let i in team) {team_members.push(team[i].login)}

        //for each open issue, check the most recent comment
        for (let i in issues) {

            let comment_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/comments');
            let comments = comment_response["data"];

            //make a nice little list of the current labels
            let current_labels=[];
            for (let j in issues[i].labels) {current_labels.push(issues[i].labels[j].name)}

            //get  the most recent comment
            let recent_comment = comments[issues[i].comments - 1];

            if (recent_comment !== undefined) {

                //if the most recent comment is from an ops team member (or is excluded from staleness tracking) and the client-response label is on the ticket, remove the client-response label
                if ((team_members.includes(recent_comment.user.login) || current_labels.includes('staleness-exception')) &&
                    current_labels.includes('client-response')) {
                    await instance.delete('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels/client-response')

                } else if (!current_labels.includes('staleness-exception') &&
                    !current_labels.includes('client-response') &&
                    !team_members.includes(recent_comment.user.login)) {
                    // add client-response to the list of labels and push the whole list.
                    current_labels.push('client-response');
                    await instance.put('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels', {labels: current_labels})

                }

            }
        }

        return true;
    } catch (err) {
        throw Error(`Unable to check which tickets need a response: ${err}`);
    }
};
