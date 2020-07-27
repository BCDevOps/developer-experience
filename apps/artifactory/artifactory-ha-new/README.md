## 1. Installing Artifactory 7 into the lab or prod clusters

1. Login to the correct openshift cluster.
2. Navigate to the correct project.
3. Open `vars.yaml` and update the `env`, `url` and `project-name` accordingly.
4. Copy the appropriate `env-helm-values.yaml` file and call it `env-helm-values-local.yaml`
5. Open `env-helm-values-local.yaml` and provide the missing ECS credential.
4. Copy the appropriate `env-sso-link.yaml` file and call it `env-sso-link-local.yaml`
5. Open the `env-sso-link-local.yaml` file and provide the missing SSO client secret.
6. Run `ansible-playbook install.yaml` and follow the in-built instructions.

## 2. Installing Artifactory 7 in a new cluster

1. Copy 1 of of the sets of env-prefixed file in this folder, giving them a new env prefix to suit the new cluster.
2. Issue the `echo $(openssl rand -hex 32)` command in your terminal twice
3. In `env-helm-values` folder, paste the resulting strings into `masterKey` and `joinKey`. These are not secret - don't worry about uploading them to github.
4. Update `env-artifactory-ha.env` to ensure that it has the correct storage class type.
5. You may update the resource requests and limits in `env-helm-values.yaml` to suit the needs of the cluster.
6. Make sure you add `env-sso-link-local.yaml` to the gitignore file.
7. At this point, following the instructions in Section 1 for this new environment should work smoothly.

## 3. Deleting Everything

Don't run unless you're sure ;)

```
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l app=artifactory-ha
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l app=postgresql
oc delete statefulsets,services,routes,secrets,configmaps,pvc -l statefulset=postgresql
```

