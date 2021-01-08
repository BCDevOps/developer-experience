## Installing Argo

This assumes that the CRDs have already been created (they have been in KLAB and Silver). 

Argo Workflows should be installed on the namespace scale. Use the following command to set everything up:
`oc apply -n [namespace] -f install.yaml`

