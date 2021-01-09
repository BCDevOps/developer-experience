## Installing Argo

This assumes that the CRDs have already been created (they have been in KLAB and Silver). Argo Workflows should be installed on the namespace scale.

Start by updating the parameters in the `install.param` file. 
Both parameters are used primarily to build the URL for the route to the argo UI, like this: `APP_NAME-argo.apps.CLUSTER.devops.gov.bc.ca`.
To that end, make sure your cluster is either `klab` or `silver` (or whatever additional clusters are available) and that your app-name is unique on that cluster (I recommend using your unique namespace name).
Do not include any periods, slashes, spaces or other characters inappropriate for a URL. 

Perform the installion like this: 
`oc process -f install.yaml --param-file=install.param | oc apply -n [NAMESPACE] -f -`

## Using Argo

The documentation here will be fairly limited, and is largely dedicated to documenting specific quirks of this particular installation. 
You are expected to use Argo's documentation to learn how to use workflows, which can be found at https://argoproj.github.io/argo/workflow-concepts/. 

### serviceAccountName

Typically, when the workflow doesn't specify a service account, Argo will just use default. 
However, the default service account is not granted the required privileges when the above installation is used.
Instead, we create a new service account called `workflow-creator` which is then granted the appropriate privileges instead.
This means that you must specify `workflow.spec.serviceAccountName` as `workflow-creator` explicitly in your workflow.
The following is an example of how to do this:

```json
{
  "metadata": {
    "name": "wonderful-bear",
    "namespace": "devops-artifactory"
  },
  "spec": {
    "serviceAccountName": "workflow-creator",
    "entrypoint": "argosay",
    "templates": [
      {
        "name": "argosay",
        "container": {
          "name": "main",
          "image": "argoproj/argosay:v2",
          "command": [
            "/argosay"
          ],
          "args": [
            "echo",
            "hello argo!"
          ]
        }
      }
    ]
  }
}
```
