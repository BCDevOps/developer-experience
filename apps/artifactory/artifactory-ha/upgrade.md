**Step 1 -  Login to openshift**

**Step 2 - Get a backup of the definition of the statefulsets you plan to patch**

```console
oc get statefulset artifactory-primary -n devops-artifactory -o yaml >> artifactory-primary.yaml
oc get statefulset artifactory-member -n devops-artifactory -o yaml >> artifactory-member.yaml
```

**Step 3 - Run the following to patch the primary node first**

* check that the path is correct in using the definitions from step 2
* update the version number of the image to match the new version

```console
oc patch statefulset artifactory-primary -n devops-artifactory --type=json -p '[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value":"docker.bintray.io/jfrog/artifactory-pro:6.15.1"}]'
```

**Step 4 - Run the following to patch the secondary node(s)**

* make sure that the primary is back up before proceeding

```console
oc patch statefulset artifactory-member -n devops-artifactory --type=json -p '[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value":"docker.bintray.io/jfrog/artifactory-pro:6.15.1"}]'
```
