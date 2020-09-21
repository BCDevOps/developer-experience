
### What is happening?

Hi team, the KeyCloak SSO service is finally removing its *Pathfinder* sticker and getting a new name.  This change does not affect the service offering but does change how you will access it.  The name is changing from sso.pathfinder.gov.bc.ca to oidc.gov.bc.ca.  For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

### When?

We are planning for an accelerated deployment cadence in order to remove blockers for the OpenShift 4 migration. This will require fast action from product teams, both from the initial functional validation activities, as well as notifying the platform-experience team immediately of any critical issues identified during testing.

This service name migration will carry out in the sequence of dev, test and then prod. For each environment, here are the major steps:

- Step 1 - Enable new service name `*.oidc.gov.bc.ca`.

  - **Please note that we are not shutting down the original service name at `sso.pathfinder.gov.bc.ca`. Instead, both pathfinder and the new `oidc.gov.bc.ca` service name will be supported for `a period of time (TODO: decide on how long)`, which allows product teams to update integrated applications and conduct thorough testing.**

- Step 2 - Product teams verify existing `pathfinder` SSO services working fine
- Step 3 - Product teams update application's SSO configuration to the new service and test out SSO integrations
- Step 4 - Platform Services team work with product teams to troubleshot any issue found
- Step 5 - Shutdown the pathfinder service name


#### Dev SSO New Service Name Enable on `Sep 24th`
As no production applications will be affected, new service name update will be scheduled during work hours. The expected SSO service disruption will last for 1.5 to 2 hours.

1 week of time are set aside for Dev environment testing before the Test environment service name change.

#### Test SSO New Service Name Enable on `Oct 1st`
As no production application will be affected, new service name update will be scheduled during work hours. The expected SSO service disruption will last for 1.5 to 2 hours.

1 week of time are set aside for Test environment testing before the Production environment service name change.

#### Production SSO New Service Name Enable on `Oct 8th`
Current SSO service disruption for the new production service name is scheduled for 5:30PM - 7:30PM (2 hours), on **October 8th, 2020**.


### Will there be an impact on the Platform apps?

Yes there will be service disruption when we enable the new SSO service name, but the effects are expected to be temporary and will last for about 10mins for each realm. This is caused by KeyCloak internal settings update from Platform Services team, if you are interested in more details, refer to [doc](./KeycloakMigration.md).

Also note that production SSO service disruption will be scheduled outside of business hours, after 5:00PM.

Once the service name enablment is complete, SSO service will return back to normal. What you should be expecting is that KeyCloak would then be accessible via both service names, `sso-*.pathfinder.gov.bc.ca` and `*.oidc.gov.bc.ca`.


### Do I need to do anything?

Yes, you will need to participate in both `Step 2 & 3` after new service name is enabled.

For Step 2, you should check on all existing usages of SSO KeyCloak immediately. There will be __one week__ to report any bugs or integration issues, before we move onto the next environment. Platform Service team will able available to help troubleshoot issues relevant to the service name change when any SSO admin action is needed.

For Step 3, you should start to update the SSO service name for all application integrations and test out the authentication flow as soon as possible. (If you have BCSC integration with your realm, stay tune for more details on how to proceed with the update. We will be working with some polit teams and BCSC team once Dev SSO has the new service name in place.)

Here are the recommended ways to start with:

- Verify your applications authentication flow are working with the original SSO service after we have enabled the new service name
- Test on KeyCloak console login with both new and original service name
- Update your application's SSO configuration with the new service name, and test
- If you have custom configuration/integration/usage of SSO KeyCloak, make sure to also update and test out. Here are some common use cases that product teams might have:
    - custom Identity Provider setup in your realm (IDPs other than `IDIR`, `BCeID`, and `BCGov-GitHub`)
    - usage of KeyCloak RESTful API
    - community libraries and packages for KeyCloak
    - etc.

**Please note that there's no changes in the SSO service offering. Thus all you need to do should be `configuration updates`, specifically the SSO service name.**


### Where do I get help if my app doesn't work after the change is complete?

- TODO: shall we add the miro boarding?
- Please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
