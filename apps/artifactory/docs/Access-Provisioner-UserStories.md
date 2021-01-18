# Artifactory User Provisioning

## Summary

Artifactory access provisioning for OpenShift applications uses (local) Artifactory accounts that are provisioned using a custom Operator.  This approach allows each namespace to be configured with an appropriate Artifactory service account.

## Goals

1. Create technical documentation of the features and actions needed to support the included user stories.
2. Create User documentation to walk through the easy path for each of the included user stories

## Proposal

### User Stories

#### Access Artifactory Content in Builds

As an Application Developer, I would like to be able to use the Artifactory Service to download containers, rpms, and/or libraries to build my applications.

#### Access Artifactory Content in Deployments

As an Application Developer, I would like to be able to use an artifactory container URL in my deployment manifest to run my workloads.

#### Manage Artifactory Credentials

As an Application Developer, I would like to be able to reset/recover the Artifactory Service Account access token/secret.

#### Lookup Available Resources

As an Application Developer, I would like to be able to discover which repository resources are available through the Artifactory Service.  I would also like to be able to request new repositories.

#### Provide Access from Multiple Clusters

As an Application Developer, I would like to be able to use the Artifactory service from any of the available DevExchange clusters.

#### Automated Provisioning
As an OPS team member, I want to enable automated default provisioning of Artifactory access with every Client ProjectSet so that managing default access to the Artifactory service is not a burden as the number of clients scales up.

#### Access Control and Audit

As an OPS team member, I would like to be able to reconcile *Artifactory Service Accounts* to a provisioning request/OCP Custom Resource.

### Implementation Details/Notes/Constraints

To consume Artifactory Services a container in a namespace requires a provisioned account in the Artifactory service, and an accessible secret containing the access token(s) for the provisioned account.

The current implementation uses a cluster-based operator that provisions the Artifactory service access, and creates a namespaced secret that contains the initially provisioned access token.

#### BCGov Artifactory Operator

The current version of the Artifactory Operator is able to perform the provisioning/decommission of the Artifactory service access.  The default namespace access provisioning is currently automated through the Project Registry pipeline.  The improvements recommended are targeted specifically at the following areas:

- Formalize the documentation for Developers to leverage the service for Builds
- Formalize the documentation for Developers to leverage the service for deployments
- Update the Operator to add [Manage Artifactory Credentials](#manage-artifactory-credentials)
- Update the Operator to add [Access Control and Audit](#access-control-and-audit)
- Update the Operator and deployments to validate [Provide Access from Multiple Clusters](#provide-access-from-multiple-clusters)

#### BCGov Artifactory Service

The current deployment of Artifactory as a service includes several external repositories configured for caching/pull-through.  To fit the User story [Lookup Available Resources](#lookup-available-resources) additional change process and documentation need to be defined.