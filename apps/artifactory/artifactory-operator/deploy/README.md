# Deploy

## Steps

## Overview or RBAC

### Artifactory Service Account Custom Resources

Artifactory Service Accounts will be provisionable by team members with appropriate object permissions in their namespaces. (ie: admin/edit) and viewable as expected by team members with view permissions.  To enable admin/edit RBAC, the following aggregate labels are used to add the appropriate permissions to the pre-existing cluster role definitions:

``` yaml
  labels:
    rbac.authorization.k8s.io/aggregate-to-admin: "true"
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
    rbac.authorization.k8s.io/aggregate-to-view: "true"
    rbac.authorization.k8s.io/aggregate-to-cluster-reader: "true"
```

The admin-edit aggregates are combined into the clusterRole `aggregate-artifactsvcas-admin-edit` with Create,Delete,View permissions.  (Note: Edit is restricted as no support for edits of the CR objects outside of the operator at this time)

The view and cluster-reader aggregates are combined into the clusterRole `aggregate-artifactsvcas-view` with View permissions.

### Artifactory Repo Custom Resources

Artifactory Repositories will not be created/editable by team members.  The aggregate permissions will allow `view` access to the artifactoryRepo custom resource as per the clusterRole `aggregate-artifactrepos-view`

### Artifactory Operator roles

The artifactory admin/operator access will require cluster wide admin access to both artifactorySas and artifactoryRepos.  In addition, admin access to dev team namespace secrets will be required.

To restrict this access appropriately, creating a specific operator cluster role to allow the following object admin access cluster wide through the clusterRole `artifactory-cluster-operator`:

- artifacts.operators.bcgov (artifactsvcas, artifactrepos)
- Secrets

In addition, the operator will require route edit and deployer access within the Artifactory namespace to be able to create/deploy docker repo routes for Artifactory.  This access is granted through the role `artifactory-operator`.  The 2 roles have been separated to limit the cluster-wide access granted to the operator.

### Artifactory Administrator roles

In order to create and troubleshoot artifactory CRs, there is a specific clusterRole created to allow full control of all CR objects (`artifactory-object-admin`).  This is granted to BCDevAdmin
