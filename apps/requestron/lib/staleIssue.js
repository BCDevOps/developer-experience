require('probot');
const axios = require('axios');
const createJWT = require('./jwt.js');

/**
 * Check for issue staleness
 */

module.exports = async function checkStaleness(context) {

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

        //check for staleness

        const issue_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues');
        const issues = issue_response["data"];

        const current_time = Date.now()/1000; // current time in seconds
        const week = 604800; // number of seconds in a week
        //const week = 360;

        for (let i in issues) {

            let labels = issues[i]['labels'];

            //make a nice little list of the current labels
            let current_labels=[];
            for (let j in issues[i].labels) {current_labels.push(issues[i].labels[j].name)}

            let comment_response = await instance.get('repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/comments');
            let unfiltered_comments = comment_response["data"];

            //remove bot comments from the list of comments because we don't want them to change anything
            let comments = [];
            for (let k in unfiltered_comments) {
                if (unfiltered_comments[k].user.login !== process.env.APP_NAME + '[bot]') {
                    comments.push(unfiltered_comments[k])
                }
            }

            // things that should prevent a ticket from going stale:
            // 1. there are no comments on the ticket (this means that the client is waiting on us)
            // 2. if the only comments on the ticket are from the bot (this means the client is waiting on us)
            // 3. the ticket has the client-response label (this means that the client is the last one to have commented, and so is waiting on us)
            // 4. the ticket has the staleness-exception label
            if ((comments.length > 0) && (!current_labels.includes('client-response')) && (!current_labels.includes('staleness-exception'))) {

                let updated_time = Date.parse(issues[i]['updated_at'])/1000; // time of the ticket's last update, in seconds.

                // only act if it's been more than a week since last update.
                if ((current_time - updated_time) > week) {

                    console.log('updating staleness for issue #' + issues[i].number);

                    // if the ticket already had the very-stale label, close it.
                    if (current_labels.includes('very-stale')) {

                        await instance.patch(
                            'repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i]['number'],
                            {"state": "closed"});
                        console.log('issue #' + issues[i].number + ' closed due to staleness.');

                        await instance.post(
                            'repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i]['number'] + '/comments',
                            {"body": "This ticket is now closed due to staleness. If you wish to continue with this request, please open a new one."});

                    // if the ticket already has the stale label, add the very-stale label.
                    } else if (current_labels.includes('stale')) {

                        // add the very-stale label to the existing list of labels and push the whole thing
                        current_labels.push('very-stale');
                        await instance.put(
                            '/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels',
                            {labels: current_labels});
                        console.log('very-stale added to issue #' + issues[i].number);

                        await instance.post(
                            'repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i]['number'] + '/comments',
                            {"body": "It has been 2 weeks or more since this ticket was last updated. This issue will be closed if it is not updated in the next 1 week."});

                    } else {

                        current_labels.push('stale');
                        await instance.put(
                            '/repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i].number + '/labels',
                            {labels: current_labels});
                        console.log('stale added to issue #' + issues[i].number);

                        await instance.post(
                            'repos/' + process.env.REPO_OWNER + '/' + process.env.REPO_NAME + '/issues/' + issues[i]['number'] + '/comments',
                            {"body": "It has been 1 week or more since this ticket was last updated. This issue is now stale. Please update it in order to keep it open."});

                    }
                }
            }
        }

        return true;
    } catch (err) {
        throw Error(`Unable to check for staleness: ${err}`);
    }
};
