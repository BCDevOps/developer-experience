const axios = require('axios');
import { Context } from 'probot'
const where = require('lodash.where');
/**
 * Set the Estimate in Zenhub to 0.5
 */

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  headers: {'Authorization': 'token ' + process.env.GITHUB_TOKEN}
});

export async function setEstimate(context: Context) {
    try {

        const openingIssue = context.issue();
        const get_response = await instance.get('repos/caggles/testing-repo/issues');
        console.log(get_response.data)
        //const labeled_issues = get_response.data.filter(issue => issue.labels == ['ops-controller']);
        //console.log(labeled_issues)

        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};

