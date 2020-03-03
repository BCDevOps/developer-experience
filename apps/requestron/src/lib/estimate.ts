const axios = require('axios')
/**
 * Set the Estimate in Zenhub to 0.5
 */

const instance = axios.create({
  baseURL: 'https://api.zenhub.io/',
  timeout: 1000,
  headers: {'X-Authentication-Token': process.env.ZENHUB_TOKEN}
});

export async function setEstimate(issueID: number) {
    try {

        //issue a PUT to the Zenhub API instructing it to create an estimate of 0.5 for the new issue.
        await instance.put('p1/repositories/219808631/issues/' + issueID + "/estimate", {"estimate": 0.5})
        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};

