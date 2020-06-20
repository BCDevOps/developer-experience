# Redeploy steps

``` bash
oc apply -f deploy/service_account.yaml -n devops-artifactory
```

## Cluster Admin Steps

``` bash
#Cleanup old roles
oc delete clusterRole aggregate-artifactory-sas-admin-edit
oc delete clusterRole aggregate-artifactory-sas-view
oc delete clusterRole artifactory-sa-admin
oc delete clusterRole artifactorysa-admin
oc delete clusterRole artifactory-sa-operator
oc delete clusterRole artifactory-admin
oc delete clusterRole artifactory-operator
oc delete role artifactory-operator -n devops-artifactory

#Create new roles
oc apply -f deploy/clusterrole-artifactory-aggregate.yaml
oc apply -f deploy/clusterrole-artifactory-operator.yaml
oc apply -f deploy/role-artifactory-operator.yaml

#Apply role bindings

```

apply clusterRoleBinding artifactory-operator to devops-artifactory/artifactory-ops
apply clusterRoleBinding artifactory-object-admin to bcdevexchange sudo acct.
apply rolebinding art-ops (local namespace perms like routes, apps, etc)
apply rolebinding art-ops to artifactory-ops
