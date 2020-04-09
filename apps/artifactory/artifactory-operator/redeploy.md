# Redeploy steps

``` bash
oc apply -f deploy/service_account.yaml -n devops-artifactory
```

## Cluster Admin Steps

``` bash
oc delete clusterRole aggregate-artifactory-sas-admin-edit
oc delete clusterRole aggregate-artifactory-sas-view
oc delete clusterRole aggregate-artifactory-repos-view

oc delete clusterrolebinding artifactory-sa-admins
oc delete clusterRole artifactory-sa-admin

oc delete clusterrolebinding artifactorysa-admins
oc delete clusterRole artifactorysa-admin

oc delete clusterrolebinding artifactory-sa-operator
oc delete clusterRole artifactory-sa-operator

oc delete clusterrolebinding artifactory-admins
oc delete clusterRole artifactory-admin

oc delete clusterrolebinding artifactory-operator
oc delete clusterRole artifactory-operator

oc delete rolebinding artifactory-operator -n devops-artifactory
oc delete role artifactory-operator -n devops-artifactory

oc delete rolebinding artifactory-sa-operator -n devops-artifactory
oc delete role artifactory-sa-operator -n devops-artifactory

oc delete sa artifactory-sa-operator -n devops-artifactory

oc apply -f deploy/clusterrole-artifactory-aggregate.yaml
oc apply -f deploy/clusterrole-artifactory-operator.yaml

oc adm policy add-cluster-role-to-user artifactory-cluster-operator system:serviceaccount:devops-artifactory:artifactory-operator

oc adm policy add-cluster-role-to-user artifactory-object-admin system:serviceaccount:openshift:bcdevops-admin

oc policy add-role-to-user artifactory-operator -z artifactory-operator -n devops-artifactory
```

Remove artifactory-sa-operator imagestream