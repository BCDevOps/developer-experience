
### What is happening?

We are upgrading our RedHat SSO Services from 7.3 to 7.4, which is KeyCloak 4.8 to 9.0.
- This is a major version upgrade, please see the release note for details: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/html-single/release_notes/index
- Here are the new SSO documentations: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/
- This upgrade will also include some BCGov login theme bug fixes: https://github.com/bcgov/ocp-sso/issues/77


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
