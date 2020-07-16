# Operator Installation

## Before you begin

- Ensure you are currently logged into the cluster you are deploying to.
- Create a service account in the artifactory namespace that will host the operator (currently requires the same namespace that Artifactory is deployed to)

`oc create sa artifactory-operator -n ${ARTIFACTORY_NAMESPACE}`

- Create/Verify an inventory file with appropriate operator installation variables  (See `test-artifactory.inv` as a sample inventory)

## Cluster Admin

The clusterAdmin.yml playbook must be run by a cluster admin

*START in* `{reporoot}/apps/artifactory/artifactory-operator/install`

``` bash
ansible-playbook clusterAdmin.yml -i ${Inventory File}
```

## Artifactory Operator Deployment

*TODO:* Build a cluster based buildConfig

### Build/push/tag image

*START in* `{reporoot}/apps/artifactory/artifactory-operator`

``` bash
operator-sdk build artifactory-operator
../oc-push-image.sh -i artifactory-operator -n devops-artifactory -r docker-registry.lab.pathfinder.gov.bc.ca
oc -n devops-artifactory tag artifactory-operator:latest artifactory-operator:v1-0.9.1-stable
```

### Deploy Operator

*START in* `{reporoot}/apps/artifactory/artifactory-operator/install`

``` bash
ansible-playbook operatorDeploy.yml -i ${Inventory File}
```

## Cleanup

- Find all existing CR's

``` bash
oc get <cr plural> --all-namespaces
```

- Delete all the found CRs.  (if operator is not running, you will need to edit each cr and remove the finalizer lines)
- After ALL CR instances of the CRDs have been deleted, then you will be able to simply run:

``` bash
ansible-playbook operatorDeploy.yml -i ${Inventory File} -e "state=absent"
```

- and then as cluster-admin:

``` bash
ansible-playbook clusterAdmin.yml -i ${Inventory File} -e "state=absent"
```
