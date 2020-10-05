
### What is happening?

Hi teams! We have successfully introduced the new SSO service name at `oidc.gov.bc.ca`! The next step is to start migrating your application SSO integration to the new name. Please note that this does not affect the service offering but just to change how you are accessing it. For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).
<!-- TODO: update sso wiki, sso service definition, and other reference! -->

For your reference, here are the original SSO service name/endpoint:
- sso-dev.pathfinder.gov.bc.ca
- sso-test.pathfinder.gov.bc.ca
- sso.pathfinder.gov.bc.ca

And the new Service name/endpoint to migration to:
- dev.oidc.gov.bc.ca
- test.oidc.gov.bc.ca
- oidc.gov.bc.ca


### When?

Starting on Oct 6th, all dev/test/prod KeyCloak instances are accessible via the new service name. Product team should schedule on follow up actions and start migration.

**Please note that we are not shutting down the original service name at `sso.pathfinder.gov.bc.ca`. Instead, both pathfinder and the new `oidc.gov.bc.ca` service name will be supported for four weeks/two sprints (will be extended longer if needed), which allows product teams to update integrated applications and conduct thorough testing.** As a result, we are expecting to deprecate the pathfinder service name for the following timeline:

#### Dev SSO pathfinder service name deprecated on `Nov 5th`
We will be working with product team to start exploring the migration process once the new service name is in place. All of your Dev application integration on KeyCloak should be updated to dev.oidc.gov.bc.ca before the deprecation to avoid service disruption.

Once you have successfully migrated SSO integration in Dev environment, proceed to Test and Production. Do not wait for the last day before service deprecation. _1 week_ of time are set aside for product teams to finial check for Test environment SSO usage and complete migration.


#### Test SSO pathfinder service name deprecated on `Nov 12sh`
Product teams should schedule to migration Test SSO integration before this date, and test on your migration plan/strategy developed from Dev migration process to get prepared for Production migration.


#### Production SSO pathfinder service name deprecated on`Nov 19th`
_Please contact us immediately if your application will require longer support of sso.pathfinder.gov.bc.ca._ If we have not received any request by the end of _Nov 12sh_, production pathfinder SSO service will be stopped as scheduled.


### Will there be an impact on the Platform apps?

Yes, all applications with SSO integration will need to be updated and migrated to use the new service name before deprecation of SSO pathfinder services.


### Do I need to do anything?

Once you have validated that both pathfinder and the new oidc SSO services are working for you, start to plan on updating your applications SSO configuration/integration as this may require an application service downtime.

### Here are the recommended ways to start migration:
1. Test KeyCloak console login with the new service name:
  - dev.oidc.gov.bc.ca
  - test.oidc.gov.bc.ca
  - oidc.gov.bc.ca
2. Update your application's SSO configuration with the new service name, and test the updated integration
  - Please note that there is no changes in the SSO service offering. Thus all you need to do should be `application configuration updates`, specifically the SSO service name URL
3. If you have custom configuration/integration/usage of SSO KeyCloak, make sure to also update and test out. Here are some common use cases that product teams might have:
    - custom Identity Provider setup in your realm (IDPs other than `IDIR`, `BCeID`, and `BCGov-GitHub`. If you have BCSC integration, see below section)
    - usage of KeyCloak RESTful API
    - community libraries and packages for KeyCloak
    - etc.

### BC Services Card Migration:
Connect with Wesley (BCSC tech lead) to update your BCSC integration to use the new service name.

1. login to KeyCloak console with the new service name for all three environments
2. Check the list of integrated Identity Providers
3. Provide the following information to Wesley at **Wesley.Gilbert@gov.bc.ca**
  - KeyCloak realm ID and display name
  - environments integrated
  - IDP redirect URI per environment (which should have the format `https://oidc.gov.bc.ca/auth/realms/<realm_name>/broker/bcsc/endpoint`)
4. Prepare your application (test in dev/test namespace) to be able to update SSO configuration and redeploy
5. Wesley will then connect with you to update BCSC configurations, and immediately you should be able to redeploy your application and test out
6. Schedule on Production service maintenance window and update in prod integration


### Where do I get help if my app doesn't work after the change is complete?

- Please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
