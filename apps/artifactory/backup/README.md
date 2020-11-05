# Backup-container

## Build

Rather than maintaining a custom build configuration, this build will leverage the [backup-container](https://bcdevops/backup-container) templates directly with default values.

```bash
oc process -f https://raw.githubusercontent.com/BCDevOps/backup-container/master/openshift/templates/backup/backup-build.json | \
  oc -n devops-artifactory apply -f -
```

This will build a `latest` tagged image that can be integrated into the pipeline.

## Deploy

Once the postgres service has been deployed, add the helm repository for the published backup-container helm charts.

```bash
helm repo add bcgov https://bcgov.github.io/helm-charts
```

Modify deploy-values.yaml and customize for the specific environment

- ensure `image.repository` and `image.tag` are updated per environment/deploy
- update `env.ENVIRONMENT_NAME.value` for the specific environment
- verify `persistence.backup.size` and `persistence.verification.size` are appropriately sized.

**Option 1: Deploy direct from helm:**

```bash
helm install db-backup bcgov/backup-storage -f deploy-values.yaml
```

**Option 2: Generate manifest using helm, and then apply**

```bash
helm template db-backup bcgov/backup-storage -f ./openshift/backup/deploy-values.yaml > \
  ./openshift/backup/db-backup-deploy.yaml
oc apply -f ./openshift/backup/db-backup-deploy.yaml
```
