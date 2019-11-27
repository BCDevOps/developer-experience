# How does it work?

The `.pipeline` folder is a node/npm module/project folder which has a dependency to `pipeline-cli`.

`pipeline-cli` (CLI) is a library with a thin wrapper around the `oc` CLI.

Stages (e.: build, deploy) of the pipeline are represented as npm `scripts` defined in `package.json`

The `lib` folder contains the pipelinestage script represented as node module so that it can be called as a `npm run-script` or mixing as depdenencies of a script (e.g.: `pipeline.js`)


# Running stages of pipeline
```
#From within he pipeline folder
npm run-script build
```

# Running the pipeline
```
#From within the pipeline folder
npm run pipeline

#Delete state
rm -rf *.state.json
```

# Developing/Troubleshooting with the pipeline-cli
- clone the pipeline-cli repository
- in the pipeline-cli run:
```
npm link
```

- From within this .pipeline folder, run:
```
rm -rf node_modules; npm install; npm link pipeline-cli
```
