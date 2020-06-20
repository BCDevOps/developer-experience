# Deleting operator

Find all existing CR's
`oc get <cr plural> --all-namespaces`

then delete all the CRs.  (if operator is not running, you will need to edit each cr and remove the finalizer lines)

Delete the cluster role(s) associated with the CRD
1. delete any clusterrolebinding of role(s)
2. delete clusterrole(s)

Delete operator deployment

Delete CRD
