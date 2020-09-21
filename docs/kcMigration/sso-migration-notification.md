
### What is happening?

Hi team, the KeyCloak SSO service is finally starting the process of removing its *Pathfinder* sticker and getting a new name.  This change does not affect the service offering but will eventually change how you will access it.  The name is changing from sso.pathfinder.gov.bc.ca to oidc.gov.bc.ca.  For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

### When?

Starting on September 24, 2020 a second vanity name will be available for accessing your dev SSO services.  This change will continue to add an oidc.gov.bc.ca name to each of the SSO environments over the coming weeks, completing the addition of a second name in the production SSO service on October 8, 2020.

This service name migration will carry out in the sequence of dev, test and then prod. For each environment, here are the major steps:

- Step 1 - Enable new service name `*.oidc.gov.bc.ca`.

  - **Please note that we are not shutting down the original service name at `sso.pathfinder.gov.bc.ca`. Instead, both pathfinder and the new `oidc.gov.bc.ca` service name will be supported for four weeks/two sprints (or longer depends on the feedback), which allows product teams to update integrated applications and conduct thorough testing.**

- Step 2 - Product teams verify existing `pathfinder` SSO services working fine
- Step 3 - Platform Services team work with product teams to troubleshot any issue found


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

You should check on all existing usages of SSO KeyCloak after the new name has been added to confirm your use of the sso-dev.pathfinder.gov.bc.ca service name is not impacted. There will be __one week__ to report any bugs or integration issues, before we move onto the next environment. Platform Service team will able available to help troubleshoot issues relevant to the service name change when any SSO admin action is needed.

Once the change has been completed in an environment, you can begin to update the SSO service name for all application integrations and test out the authentication flow with the new enterprise service name. (If you have BCSC integration with your realm, stay tuned for more details on how to proceed with the update. We will be working with some polit teams and BCSC team once Dev SSO has the new service name in place.)

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

- Please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
