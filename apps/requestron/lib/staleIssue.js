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

module.exports = async function checkStaleness(context) {
    try {

        //check for staleness

        return true;
    } catch (err) {
        throw Error(`Unable to check for staleness: ${err}`);
    }
};
