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
│   ├── Dockerfile
│   └── test-framework
│       ├── ansible-test.sh
│       └── Dockerfile
├── deploy
│   ├── crds
│   │   ├── crd-artifactrepo.yaml
│   │   ├── crd-artifactsvca.yaml
│   │   ├── jeff-docker-local.env
│   │   ├── team-type-locator.env
│   │   ├── tmpl-artifactory-repo.yaml
│   │   └── tmpl-artifactory-sa.yaml
│   ├── d-artifactory-operator.yaml.j2
│   ├── k8s_roles
│   │   ├── cr-aggregate-artifactrepos-view.yaml
│   │   ├── cr-aggregate-artifactsvcas-admin-edit.yaml
│   │   ├── cr-aggregate-artifactsvcas-view.yaml
│   │   ├── cr-artifactory-cluster-operator.yaml
│   │   ├── cr-artifactory-object-admin.yaml
│   │   ├── crb-cluster-object-admin.yaml.j2
│   │   ├── crb-cluster-operator.yaml.j2
│   │   ├── r-artifactory-operator.yaml.j2
│   │   └── rb-artifactory-operator.yaml.j2
│   └── README.md
├── images
│   ├── admin-secret.png
│   ├── Artifactory-operator.png
│   ├── Artifactory-repo-automation.drawio
│   └── Artifactory-repo-automation.png
├── install
│   ├── clusterAdmin.yml
│   ├── inventory
│   ├── operatorDeploy.yml
│   ├── README.md
│   └── test-artifactory.inv
├── README.md
├── roles
│   ├── artifactory_repo
│   │   ├── defaults
│   │   │   └── main.yml
│   │   ├── files
│   │   │   └── repo.json
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── meta
│   │   │   └── main.yml
│   │   ├── README.md
│   │   ├── tasks
│   │   │   ├── docker-local.yml
│   │   │   ├── local.yml
│   │   │   ├── main.yml
│   │   │   ├── remote.yml
│   │   │   └── virtual.yml
│   │   ├── templates
│   │   │   ├── artRepository-local.json.j2
│   │   │   ├── artRepository-virtual.json.j2
│   │   │   └── PermissionTargetV2.json.j2
│   │   └── vars
│   │       └── main.yml
│   └── artifactory_serviceacct
│       ├── defaults
│       │   └── main.yml
│       ├── files
│       ├── handlers
│       │   └── main.yml
│       ├── meta
│       │   └── main.yml
│       ├── README.md
│       ├── tasks
│       │   └── main.yml
│       ├── templates
│       │   └── create_account.json.j2
│       └── vars
│           └── main.yml
├── test
│   ├── add-permission-user.yml
│   ├── clean-test.yml
│   ├── find-artifactorysa-obj.yml
│   ├── readme.md
│   ├── test-vars-artifactoryRepo.yml
│   ├── test-vars-artifactorySA.yml
│   ├── test-vars-virtual.yml
│   ├── token-tests.yml
│   ├── UpdatePermissionTarget.json.j2
│   └── user-auth-check.yml
└── watches.yaml
```

## Deployment

In the Artifactory deployment project, confirm that the secret `artifactory-admin` exists with a password for Artifactory. Leave Username blank.

![](images/admin-secret.png)

### Operator Install automation

Follow the Operator Installation instructions in [./install/README.md](./install/README.md)

## Creating Artifactory Custom Resources

There are 2 types of Artifactory Custom resources.

### Repository Creation

> Must have cluster-role artifactory-object-admin for Artifactory Repository creation

Example ArtifactoryRepo CR (Custom Resource) exists under `deploy/crds/tmpl-artifactory-repo.yaml`

An example env file also exists under `deploy/crds/team-type-locator.env`

| Parameter                 | Comments                                                 | 
|---------------------------|----------------------------------------------------------|
| TEAM_NAME                 | Name of the repository                                   |
| REPO_TYPE                 | Type: docker, maven etc                                  |
| REPO_LOCATOR              | local or virtual                                         |
| REPO_DESCRIPTION          | Description of the repo                                  |
| LIST_REPOS_VIRTUAL        | If type virtual, list local repos to add to virtual repo |

Create the ArtifactoryRepo Custom Resource:

``` bash
 oc --as=system:serviceaccount:openshift:bcdevops-admin process -f ./deploy/crds/tmpl-artifactory-repo.yaml --param-file=./deploy/crds/team-type-locator.env --ignore-unknown-parameters=true | oc --as=system:serviceaccount:openshift:bcdevops-admin create -f -
 oc process -f ./deploy/crds/tmpl-artifactory-repo.yaml --param-file=./deploy/crds/team-type-locator.env --ignore-unknown-parameters=true | oc create -f -
```

A repository Service Account user (and namespace secret) is created with each repository.  This service account will be named `{TEAM_NAME}-{REPO_TYPE}-{REPO_LOCATOR}`, and can be used to manage the repository access.

### Artifactory Service Account Creation

> Requires namespace editor (or admin) to create or delete the artifactorySA objects.

Example ArtifactorySA CR (Custom Resource) exists under `deploy/crds/tmpl-artifactory-sa.yaml`

| Parameter                 | Comments                                                 |
|---------------------------|----------------------------------------------------------|
| DESCRIPTOR                | Description for the Service Account                      |

Create the ArtifactorySA Custom Resource:

``` bash
 oc process -f ./deploy/crds/tmpl-artifactory-sa.yaml -p DESCRIPTOR="Description of Service Account" | oc create -f -
```

#### Service Account Permissions

By default, a service account will have access to the (cluster) public repositories for cached and/or cluster authenticated repository access.

To add additional access to your private repositories, you will need to add the Service Account user to your repository permissions.

see: [https://www.jfrog.com/confluence/display/JFROG/Artifactory+REST+API+V2]
