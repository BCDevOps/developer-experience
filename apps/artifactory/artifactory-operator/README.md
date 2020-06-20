## Overview

This Ansible Operator has been written for Artifactory to handle multi-tenancy, repo creation and user permissions.

## High-level architecture

![](images/Artifactory-operator.png) 

## Repository tree

```
$ tree
.
├── artrepository-destroy.yml
├── artrepository-main.yml
├── artserviceacct-destroy.yml
├── artserviceacct-main.yml
├── build
│   ├── Dockerfile
│   └── test-framework
│       ├── ansible-test.sh
│       └── Dockerfile
├── cleanup.md
├── deploy
│   ├── clusterrole-artifactory-sa-aggregate.yaml
│   ├── crds
│   │   ├── artifactory-cr-template.yaml
│   │   ├── artifactoryrepo_v1alpha1_artifactoryrepo_crd.yaml
│   │   ├── jeff-docker-local.env
│   │   ├── lab-ops-rolebinding.yaml
│   │   └── team-type-locator.env
│   ├── lab-operator-live.yaml
│   ├── lab-operator.yaml
│   ├── operator-tmpl.yaml
│   ├── repo-role-binding.yaml
│   ├── repo-role.yaml
│   ├── sa-role-binding.yaml
│   ├── sa-role.yaml
│   └── service_account.yaml
├── images
│   ├── admin-secret.png
│   ├── Artifactory-operator.png
│   ├── Artifactory-repo-automation.drawio
│   └── Artifactory-repo-automation.png
├── README.md
├── roles
│   ├── artifactory_repo
│   │   ├── defaults
│   │   │   └── main.yml
│   │   ├── files
│   │   │   └── repo.json
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── meta
│   │   │   └── main.yml
│   │   ├── README.md
│   │   ├── tasks
│   │   │   ├── docker-local.yml
│   │   │   ├── local.yml
│   │   │   ├── main.yml
│   │   │   ├── remote.yml
│   │   │   └── virtual.yml
│   │   ├── templates
│   │   │   ├── artRepository-local.json.j2
│   │   │   ├── artRepository-virtual.json.j2
│   │   │   └── PermissionTargetV2.json.j2
│   │   └── vars
│   │       └── main.yml
│   └── artifactory_serviceacct
│       ├── defaults
│       │   └── main.yml
│       ├── files
│       ├── handlers
│       │   └── main.yml
│       ├── meta
│       │   └── main.yml
│       ├── README.md
│       ├── tasks
│       │   └── main.yml
│       ├── templates
│       │   └── create_account.json.j2
│       └── vars
│           └── main.yml
├── test
│   ├── add-permission-user.yml
│   ├── clean-test.yml
│   ├── find-artifactorysa-obj.yml
│   ├── test-vars-artifactoryRepo.yml
│   ├── test-vars-artifactorySA.yml
│   ├── test-vars-virtual.yml
│   ├── token-tests.yml
│   ├── UpdatePermissionTarget.json.j2
│   └── user-auth-check.yml
└── watches.yaml
```

#### Create Custom Resource Definition for Artifactory

Cluster admin will be required to create the cluster wide CRD and associated role (for managing the CR objects).

``` bash
$pwd
/artifactory/artifactory-operator
```

##### Give the service account for the Artifactory Operator deployment required permissions

Adding a cluster-rolebinding for the artifactory-admin role is not covered by this installation, but will be required for any accounts that will be managing the lifecycle of the CRs.
A separate PR to add a cluster CR role to the bcdevex-admin team has been created in the devops-platform-operations-docs repo (PR-13)

Admins must deploy the following using `oc apply` or `oc create`:

``` bash
oc apply -f deploy/crds/crd-artifactrepo.yaml
oc apply -f deploy/crds/crd-artifactsvca.yaml
oc apply -f deploy/clusterrole-artifactory-aggregate.yaml
oc apply -f deploy/clusterrole-artifactory-operator.yaml
```

Add object admin to bcdevops-admin

``` bash
oc adm policy add-cluster-role-to-user artifactory-object-admin system:serviceaccount:openshift:bcdevops-admin
```

#### Build Operator Image

``` bash
$pwd
/artifactory/artifactory-operator
```

``` bash
$ operator-sdk build <image-name>
$ docker push <image-name>
# alt push method:
# ../oc-push-image.sh -i <image-name> -n <namespace> -r docker-registry.pathfinder.gov.bc.ca

$ oc -n <namespace> tag <image-name>:latest <image-name>:v1-0.9.0-stable
```

## How to run

#### Change project context

``` bash
oc project <artifactory-project>
```

#### Confirm Administrative Secret

In the project, confirm that the secret `artifactory-admin` exists with a password for Artifactory. Leave Username blank.

![](images/admin-secret.png)

#### Deploy Artifactory Operator

``` bash
# create service account and roles first
oc process -f ./deploy/operator-sa-tmpl.yaml | oc apply -f -
```

Need to ensure appropriate cluster roles are assigned to the operator service account

``` bash
oc adm policy add-cluster-role-to-user artifactory-cluster-operator system:serviceaccount:devops-artifactory:artifactory-operator
```

``` bash
oc process -f deploy/operator-tmpl.yaml \
-p ARTIFACTORY_BASE_DNS=${BASE_DNS} \
-p IMAGE_TAG=${IMAGE_TAG} \
-p IMAGE=${NAMESPACE}/${IMAGE_NAME} \
| oc apply -f -
```

Sample Manifest generation without apply:

``` bash
oc process -f ./deploy/operator-tmpl.yaml \
-p ARTIFACTORY_BASE_DNS=artifacts-old.lab.pathfinder.gov.bc.ca \
-p IMAGE_TAG=v1-0.9.0-stable \
-p IMAGE=test-artifactory/artifactory-operator \
-o yaml
```

## Creating Artifactory Custom Resources and Objects

> Must have cluster-role artifactory-admin

Example Artifactory CR (Custom Resource) exists under `deploy/crds/tmpl-artifactory-repo.yaml` and `deploy/crds/tmpl-artifactory-sa.yaml`

An example env file also exists under `deploy/crds/team-type-locator.env`

| Parameter                 | Comments                                                 | 
|---------------------------|----------------------------------------------------------|
| CONSOLE_NAME              | Name of the environment (prod or lab)                    |
| TEAM_NAME                 | Name of the repository                                   |
| REPO_TYPE                 | Type: docker, maven etc                                  |
| REPO_LOCATOR              | local or virtual                                         |
| REPO_DESCRIPTION          | Description of the repo                                  |
| LIST_REPOS_VIRTUAL        | If type virtual, list local repos to add to virtual repo |

Create the Custom Resource:

``` bash
 oc --as=system:serviceaccount:openshift:bcdevops-admin process -f artifactory-cr-template.yaml --param-file=team-type-locator.env --ignore-unknown-parameters=true | oc --as=system:serviceaccount:openshift:bcdevops-admin create -f -
 ocas process -f artifactory-cr-template.yaml --param-file=team-type-locator.env --ignore-unknown-parameters=true | ocas create -f -
```

## New Design Notes

Service Account pieces:

**User** - can be created for a service account, requires a user-password
**User-Password** password for use by a user account.  (no change policies at this time)
**User-Token** token generated by a user account to provide access (limited in duration to system expiry settings)
**non-user-token** tokens generated for access that are not bound to a user account.  Valid for as long as the token.  Requires group membership in order to have access within artifactory
**group** Group that can be added to permissions.  Can contain both Users, other groups, and non-existent user tokens
**Permission** applied to repositories to provide permissions

### Additional Ideas

#### Repo creation

- create repo
- create 3 groups - [manage, deployer, builder]
- Call - **Create non-user-token** and add to manage group
- Create permission for repo and add the following groups with permissions
  - manage: manage,read,write,annotate
  - deployer: read only
  - builder: read/write

#### Create non-user-token

Instead of service accounts, we could create non-user tokens and add them to specific groups.  Allows us to manage one less object.

- admin must create non-user token (can set to never expire, but would be awesome to resolve that differently)
- token added to service-token group (needs to be created with read access to all remotes)

Create artifactory "group" as an openshift service account idea.. then can generate 2 tokens and add them to separate "user" secrets.  update the artifactory-group object with the secret names in the status
Can delete a secret, and have the operator delete the art token, and create a new one.

