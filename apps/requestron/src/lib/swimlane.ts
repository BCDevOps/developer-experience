const axios = require('axios')
/**
 * Set the Estimate in Zenhub to 0.5
 */

const instance = axios.create({
  baseURL: 'https://api.zenhub.io/',
  timeout: 1000,
  headers: {'X-Authentication-Token': process.env.ZENHUB_TOKEN}
});

export async function setSwimlane(issueID: number) {
    try {

        //set a default pipeline ID, equal to "Unreviewed"
        let opPipelineID = '5bb7c5abe135e46293df16aa'

        //get the pipeline ID of the Operations swimlane
        const board = await instance.get('p2/workspaces/5bb7c5ab4b5806bc2beb9d15/repositories/219808631/board')
        for (let i = 0; i < board.data.pipelines.length; i++) {
            let pipeline = board.data.pipelines[i]
            if (pipeline.name == "Operations") {
                opPipelineID = pipeline.id
            }
        }

        //move the issue from into the Operations swimlane
        const post_response = await instance.post('p2/workspaces/5bb7c5ab4b5806bc2beb9d15/repositories/219808631/issues/' + issueID + "/moves", {"pipeline_id": opPipelineID, "position": "bottom"})
        return true;

    } catch (err) {

        throw Error('Unable to handle issue: ' + err)

    }
};

