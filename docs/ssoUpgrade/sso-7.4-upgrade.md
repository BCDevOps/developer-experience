
### What is happening?

We are upgrading our RedHat SSO Services from 7.3 to 7.4, which is KeyCloak 4.8 to 9.0.
- This is a major version upgrade, please see the release note for details: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/html-single/release_notes/index
- Here are the new SSO documentations: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/
- This upgrade will also include some BCGov login theme bug fixes: https://github.com/bcgov/ocp-sso/issues/77

### Timeline:
- initial DEV upgrade: Aug 6 (upgrade failed)
- debug upgrade issue: Aug 7 - 18
- prep for upgrade: Aug 24 - 25
- DEV upgrade: Aug 26 - 27
- App team testing in DEV with PS team support: Aug 27 - Sep 8
- TEST upgrade: Sep 9 - 10
- App team Verifying in TEST with PS team support: Sep 10 - 16
- PROD upgrade: Sep 17 - 18
- App team Verifying in PROD with PS team support: Sep 18 - 23

### Following are action items for Platform Services Team

#### Prep Work:
- [x] create temporary sandbox deployment for upgrade process
- test upgrade in sandbox with all database
- [x] DEV
- [x] TEST
- [x] PROD
- create templates for Upgrade Objects (DC and Configmap) using the same BCGov SSO image
- [x] DEV
- [x] TEST
- [x] PROD
- obtain manual DB update script for all three db instances
- [x] DEV
- [x] TEST
- [x] PROD
- estimate time needed for each upgrade process
- [x] DEV
- [x] TEST
- [x] PROD


### Debugging Upgrade Issue:
As a direct upgrade with existing instance did not work, we have to manually handle the upgrade with separate job pod and update existing data.
- increase pod resources to speed up
- increase timeout with JAVA param extension: `-Djboss.as.management.blocking.timeout=1200`
- manually running db update scripts (https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/html/red_hat_single_sign-on_for_openshift_on_openjdk/tutorials#upgrading-sso-db-from-previous-version)
- dropping existing `jbosststxtable` transaction tables that were accumulated from all previous pods (o.w. this will cause issue during upgrade roll back)
- increase jboss transaction timeout (https://access.redhat.com/solutions/18425 and https://access.redhat.com/solutions/361823)
- turn `standalone-openshift.xml` into configmap instead of docker build
- enable logging level: https://access.redhat.com/solutions/3932511


### Upgrade Tasks in Each Environment and Estimation on Time:
- take a backup of PDB + deployments + routes
- delete the `PodDistruptionBudget`
- remove app route
- scale down the apps
> --- 5min
- take DB backup
> --- 5min
- update patroni storage type (in dev sso, switch from netapp-block back to gluster)
> --- 15min
- run upgrade works on both DB and deployment
> --- 30min
- remove all tmp objects
> --- 1min
- scale up app + route
> --- 15mins

***In total, expect 1.5 hours of maintenance window for each environment.***
