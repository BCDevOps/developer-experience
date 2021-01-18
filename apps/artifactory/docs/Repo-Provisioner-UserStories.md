# Artifactory Repo Provisioning

## Summary

Artifactory repositories for OpenShift applications are provisioned using a custom Operator.

## Goals

1. Create technical design and documentation of the features and actions needed to support the included user stories.
2. Create User documentation to walk through the easy path for each of the included user stories

## Proposal

### User Stories

#### Create a repository that can be accessed by multiple clusters

As an Application Developer, I would like to be able to use the Artifactory Service to store containers, rpms, and/or libraries I use to build and run my applications.

#### Manage Repository Access

As an Application Developer, I would like to be able to manage access permissions to my Artifactory repositories.

### Implementation Details/Notes/Constraints

TBD

#### BCGov Artifactory Operator

TBD

#### BCGov Artifactory Service

Operational sizing, repository pruning, repository quotas and constraints need to be established before onboarding teams.