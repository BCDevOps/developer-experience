## 1. Installing Artifactory 7

1. Login to the correct openshift cluster.
2. Navigate to the correct project.
3. Copy `vars.yaml` and paste it into the same folder with the name `vars_local.yaml`
4. Open `vars_local.yaml` and update any of the variables as required. Note that the `build` variable only reflects whether or not you want to build a new image for patroni.
6. Run `ansible-playbook install.yaml` and follow the in-built instructions.

## 2. Installing Artifactory 7 in a new cluster

Gotta add new instructions here.

## 3. Deleting Everything

Don't run unless you're sure ;)

```
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l app=artifactory-ha
oc delete statefulsets,services,routes,secrets -l app=patroni-001
oc delete configmaps -l cluster-name=patroni-001
oc delete pvc -l app=patroni-001
```
