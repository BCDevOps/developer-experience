require('probot');
const axios = require('axios');
const createJWT = require('./jwt.js');

/**
 * Check for issue staleness
 */

module.exports = async function checkNeedsResponse(context) {

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

        // get a list of open issues in the repo
        const issue_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues');
        const issues = issue_response["data"];

        // get a list of team members
        // yes, i know hardcoding it is bad.
        // i gotta come up with a better option, honestly.
        let team_members = ["caggles", "ShellyXueHan", "patricksimonian"];

        //for each open issue, check the most recent comment
        for (let i in issues) {

            let comment_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/comments');
            let unfiltered_comments = comment_response["data"];

            //remove bot comments from the list of comments because we don't want them to change anything
            let comments = [];
            for (let k in unfiltered_comments) {
                if (unfiltered_comments[k].user.login !== process.env.APP_NAME + '[bot]') {
                    comments.push(unfiltered_comments[k])
                }
            }

            //make a nice little list of the current labels
            let current_labels=[];
            for (let j in issues[i].labels) {current_labels.push(issues[i].labels[j].name)}

            //get  the most recent comment
            let recent_comment = undefined;
            if (comments.length > 0) {
                recent_comment = comments[comments.length - 1];
            }


            if (recent_comment !== undefined) {

                //if the most recent comment is from an ops team member (or is excluded from staleness tracking) and the client-response label is on the ticket.
                if ((team_members.includes(recent_comment.user.login) || current_labels.includes('staleness-exception')) &&
                    current_labels.includes('client-response')) {

                    await instance.delete('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels/client-response');
                    console.log('client-response removed on issue #' + issues[i].number);


                // if the most recent comment is from a client (aka not an ops member) and is not excluded from staleness tracking, add client-response and remove any staleness labels.
                } else if (!current_labels.includes('staleness-exception') &&
                    !current_labels.includes('client-response') &&
                    !team_members.includes(recent_comment.user.login)) {

                    // add client-response to the list of labels and push the whole list.
                    current_labels.push('client-response');
                    await instance.put('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels', {labels: current_labels});
                    console.log('client-response added on issue #' + issues[i].number);

                    // remove the stale label, if applicable
                    if (current_labels.includes('stale')) {
                        await instance.delete('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels/stale');
                        console.log('stale removed on issue #' + issues[i].number);
                    }

                    // remove the very-stale label, if applicable
                    if (current_labels.includes('very-stale')) {
                        await instance.delete('/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels/very-stale');
                        console.log('very-stale removed on issue #' + issues[i].number);
                    }

                }

            }
        }

        return true;
    } catch (err) {
        console.log(err);
        throw Error(`Unable to check which tickets need a response: ${err}`);
    }
};
