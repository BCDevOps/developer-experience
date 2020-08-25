
### What is happening?

We are upgrading our RedHat SSO Services from 7.3 to 7.4, which is KeyCloak 4.8 to 9.0.
- This is a major version upgrade, please see the release note for details: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/html-single/release_notes/index
- Here are the new SSO documentations: https://access.redhat.com/documentation/en-us/red_hat_single_sign-on/7.4/
- This upgrade will also include some BCGov login theme bug fixes: https://github.com/bcgov/ocp-sso/issues/77


### When?

The planning is for an accelerated deployment cadence in order to remove blockers for the OpenShift 4 migration.  This will require fast action from our development teams, both from the initial functional validation activities, as well as notifying the platform-experience team immediately of any critical issues identified during testing.

The full upgrade timeline is to have the upgrade rolled out to production within 3 weeks.

- Dev SSO: `Aug 26th`
As no production application will be affected, service maintenance downtime will be scheduled during work hours.  The expected service outage is for 1.5 hours.

2 weeks are set aside for Dev environment testing before the Test environment is scheduled to be upgraded.

- Test SSO: `Sep 9th`
As no production application will be affected, service maintenance downtime will be scheduled during work hours.  The expected service outage is for 1.5 hours.
1 week is set aside for Test environment validation before the Production environment is scheduled to be upgraded.

- Production SSO: `Sep 17`
Current service downtime for the upgrade is scheduled for 5:30PM - 7:30PM (2 hours), on September 17, 2020.


### Will there be an impact on the Platform apps?

Yes, there will be service downtime during the upgrade.  The expected service outage is 1.5 hours, with the production environment scheduled outside of business hours. (after 5:00PM)

In addition, expect some minor changes to existing configurations such as authentication flows and OIDC settings.  Both from update flow configuration changes, as well as theme fixes we are applying at the same time.


### Do I need to do anything?

We highly recommend teams to test out existing usages for applications on Dev and Test KeyCloak, for example to test on any custom authentication flows and IDP integrations. If the upgrade does affect application's authentication process, please work on remediating it and get ready with plans to update for your production application integration.

There will be a __two week__ interval between Dev and Test upgrades where you and your team will be able to test out your application integration as well as API Usage. 

Between Test and Prod, there will be __one week__ to report any bugs, or integration issues. The two week interval between Dev and Test environments will the best opportunity to debug and integrate your application with the new version of Keycloak.

Platform Service team will able available on supporting with issues encountered after the upgrade if any admin action is needed. However, if you have any customization in the realm, please refer to the release note (provided in the top of the doc) for details.


### Where do I get help if my app doesn't work after the change is complete?

- Please refer to the docs and release notes for recommendations on resolving issues and incompatibility after the upgrade.
- If the change is not indicated/expected as per documentation, please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
