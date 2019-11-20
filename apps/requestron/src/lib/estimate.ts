import { request } from 'http';
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
    console.log("i'm waiting")
    const response = await instance.put('p1/repositories/219808631/issues/' + issueID + "/estimate", { "estimate" : 0.5 })
    console.log("i'm finished waiting")
    console.log(response)
  return true;
};
