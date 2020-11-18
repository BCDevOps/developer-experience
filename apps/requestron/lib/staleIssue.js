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

        return true;
    } catch (err) {
        throw Error(`Unable to check for staleness: ${err}`);
    }
};
