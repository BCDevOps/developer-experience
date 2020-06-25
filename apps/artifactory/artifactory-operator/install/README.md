# Operator Installation

## Before you begin

- Ensure you are currently logged into the cluster you are deploying to.
- Create a service account in the artifactory namespace that will host the operator (currently requires the same namespace that Artifactory is deployed to)

`oc create sa artifactory-operator -n ${ARTIFACTORY_NAMESPACE}`

## Cluster Admin

The clusterAdmin.yml playbook must be run by a cluster admin

*START in* `{reporoot}/apps/artifactory/artifactory-operator/install`

``` bash
ansible-playbook clusterAdmin.yml -e "svcAcct=artifactory-operator namespace=test-artifactory"
```

### Cleanup

After ALL CR instances of the CRDs have been deleted, then you will be able to simply run:

``` bash
ansible-playbook clusterAdmin.yml -e "svcAcct=artifactory-operator namespace=test-artifactory state=absent"
```

## Artifactory Operator Deployment

*TODO:* Build a cluster based buildConfig

### Build/push/tag image

*START in* `{reporoot}/apps/artifactory/artifactory-operator`

``` bash
operator-sdk build artifactory-operator
../oc-push-image.sh -i artifactory-operator -n test-artifactory -r docker-registry.lab.pathfinder.gov.bc.ca
oc -n test-artifactory tag artifactory-operator:latest artifactory-operator:v1-0.9.0-stable
```

### Deploy Operator

*START in* `{reporoot}/apps/artifactory/artifactory-operator/install`

``` bash
ansible-playbook operatorDeploy.yml -e "svcAcct=artifactory-operator namespace=test-artifactory"
```
