
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


### When?

- Dev SSO:
Please expect the upgrade to happen at Thursday Aug 26th. As no production application will be affected, service maintenance downtime will be scheduled during work hours. Expect 1.5 hours of maintenance window for each environment.

- Test SSO:
Test upgrade is scheduled to happen at Sep 9th. We are setting aside 2 weeks before the Test upgrade so that app teams will be able to get prepared for going to production (if actions needed, app teams could verify during Test upgrade). As no production application will be affected, service maintenance downtime will be scheduled during work hours. Expect 1.5 hours of maintenance window for each environment.

- Production SSO:
We will set aside another weeks before introducing the production SSO service upgrade. Specific date and time to be determined. The maintenance period will be scheduled after office hours to minimize impacts. Expect 1.5 hours of maintenance window for each environment.


### Will there be an impact on the Platform apps?

Yes, there will be service downtime during the upgrade. In addition, do expect some minor changes to existing configurations, such as authentication flows and OIDC settings. There will not be direct impact on how the authentication works according to the release note, but some configurations will be updated automatically during the upgrade.


### Do I need to do anything?

We highly recommend teams to test out existing usages for applications on Dev and Test KeyCloak, for example to test on any custom authentication flows and IDP integrations. If the upgrade does affect application's authentication process, please work on remediating it and get ready with plans to update for your production application integration.

We are planning on a 2-week break between Dev and Test upgrade for teams to test out the application integration as well as API usage. In the case where teams do find out necessary work required before upgrade happen to Prod, the Test instance upgrade will be a good chance to test it out.

Platform Service team will able available on supporting with issues encountered after the upgrade if any admin action is needed. However, if you have any customization in the realm, please refer to the release note (provided in the top of the doc) for details.


### Where do I get help if my app doesn't work after the change is complete?

- Please refer to the docs and release notes for recommendations on resolving issues and incompatibility after the upgrade.
- If the change is not indicated/expected as per documentation, please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.

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


### Upgrade Tasks in Each Environment and Estimation on Time::
- take a backup of PDB + deployments + routes
- delete the `PodDistruptionBudget`
- remove app route
- scale down the apps
> --- 5min
- take DB backup
> --- 5min
- update patroni storage type
> --- 15min
- run upgrade works on both DB and deployment
> --- 30min
- remove all tmp objects
> --- 1min
- scale up app + route
> --- 15mins

***In total, expect 1.5 hours of maintenance window for each environment.***
