helm template artifactory jfrog/artifactory-ha -f ./values.yaml >> everything.yaml

oc delete statefulsets,services,routes,secrets,configmaps,pvc -l app=artifactory-ha
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l app=postgresql
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l statefulset=postgresql

oc cp 20200618.195526.zip artifactory-artifactory-ha-primary-0:/var/opt/jfrog/artifactory/backup/artifactory/20200618.195526.zip

