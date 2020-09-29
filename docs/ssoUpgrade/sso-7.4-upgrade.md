
### What is happening?

We are upgrading our RedHat SSO Services from 7.3 to 7.4, which is KeyCloak 4.8 to 9.0.
- This is a major version upgrade, please see the release note for details: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/html-single/release_notes/index
- Here are the new SSO documentations: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/
- This upgrade will also include some BCGov login theme bug fixes: https://github.com/bcgov/ocp-sso/issues/77


### When?

- Dev and Test SSO:
Please expect the upgrade to happen tomorrow (Thursday Aug 6th). As no production application will be affected, service maintenance downtime will be scheduled during work hours.

- Production SSO:
We will set aside 1-2 weeks before introducing the production SSO service upgrade. Specific date and time to be determined. The maintenance period will be scheduled after office hours to minimize impacts.


### Will there be an impact on the Platform apps?

Yes, there will be service downtime during the upgrade. In addition, do expect some minor changes to existing configurations, such as authentication flows and OIDC settings. There will not be direct impact on how the authentication works according to the release note, but some configurations will be updated automatically during the upgrade.


### Do I need to do anything?

We highly recommend teams to test out existing usages for applications on dev/test KeyCloak, for example to test on any custom authentication flows and IDP integrations. If the upgrade does affect application's authentication process, please work on remediating it and get ready with plans to update for your production application integration.


### Where do I get help if my app doesn't work after the change is complete?

- Please refer to the docs and release notes for recommendations on resolving issues and incompatibility after the upgrade.
- If the change is not indicated/expected as per documentation, please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
