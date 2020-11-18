const axios = require('axios');
require('probot');
const createJWT = require('./jwt.js');

/**
 * Adds link to new ticket in ops-controller
 * Calculates total number of ops tickets in ops-controller
 */

const instance = axios.create({
  baseURL: 'https://api.zenhub.io/',
  timeout: 10000,
  headers: {'X-Authentication-Token': process.env.ZENHUB_TOKEN}
});

module.exports = async function setEstimate(context) {

    try {

        const openingIssue = context.issue();

        // set estimate
        const getController = await instance.put(
            '/p1/repositories/' + process.env.REQUEST_REPO_ID + '/issues/' + openingIssue.number + '/estimate',
            { "estimate": 0.5 });

    } catch (err) {

        throw Error('Unable to handle issue in estimate: ' + err)

    }
};

