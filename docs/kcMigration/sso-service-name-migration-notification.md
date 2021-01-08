---
description: KeyCloak (RH-SSO) Migration from Pathfinder to BCGov service
resourceType: Documentation
title: BC Government KeyCloak (RH-SSO) Service Name Migration Plan
labels:
- sso service name migration
- keycloak host name change
---
> Update!! The test and production migrations will now happen on ___January 18th 2021___
### What is happening?

Hi teams! We have successfully introduced the new SSO service name at `oidc.gov.bc.ca`! The next step is to start migrating your application SSO integration to the new name. Please note that this change did not affect the service offering (no changes to the functionality) and only changes how the SSO service is accessed by applications. For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).
<!-- TODO: update sso wiki, sso service definition, and other reference! -->

For your reference, here are the original SSO service name/endpoint:
- sso-dev.pathfinder.gov.bc.ca
- sso-test.pathfinder.gov.bc.ca
- sso.pathfinder.gov.bc.ca

And the new Service name/endpoint to migrate to:
- dev.oidc.gov.bc.ca
- test.oidc.gov.bc.ca
- oidc.gov.bc.ca


### When?

Starting on Oct 6th, all dev/test/prod KeyCloak instances are accessible via the new service name. Product team are encouraged to start planning the migration to the new SSO service name.

**Please note that we are not shutting down the original service name at `sso.pathfinder.gov.bc.ca`. Instead, both pathfinder and the new `oidc.gov.bc.ca` service name will be supported for 12 weeks/four sprints (will be extended longer if needed), which allows product teams to update integrated applications and conduct thorough testing.** Production SSO pathfinder service name will be supported until earlier next year to give teams more time for migration and avoid holiday time. As a result, we are expecting to deprecate the pathfinder service name for the following timeline:

#### Dev SSO pathfinder service name deprecated on `Dec 14th 2020`
We will be working with product team to start exploring the migration process once the new service name is in place. All of your Dev application integration on KeyCloak should be updated to dev.oidc.gov.bc.ca before the deprecation to avoid service disruption.

Once you have successfully migrated SSO integration in Dev environment, proceed to Test and Production. Do not wait for the last day before service deprecation. _1 week_ of time are set aside for product teams to finial check for Test environment SSO usage and complete migration.


#### Test SSO pathfinder service name deprecated on `Jan 18th 2020` (was Dec 21st 2020)
Product teams should schedule to migration Test SSO integration before this date, and test on your migration plan/strategy developed from Dev migration process to get prepared for Production migration.


#### Production SSO pathfinder service name deprecated on`Jan 18th 2021`(was Jan 11th 2021)
_Please contact us immediately if your application will require longer support of sso.pathfinder.gov.bc.ca._ If we have not received any request by the end of _Dec 21st_, production pathfinder SSO service will be stopped as scheduled.


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
Connect with Wesley Gilbert (BCSC Integration Architect; **Wesley.Gilbert@gov.bc.ca**) to update your BCSC integration to use the new service name.

1. Login to KeyCloak console with the new service name for all three KeyCloak environments
2. Check the list of integrated Identity Providers
3. Provide the following information to Wesley
  - KeyCloak realm ID and display name
  - Application Environments integrated
  - IDP redirect URI per environment (which should have the format `https://*.oidc.gov.bc.ca/auth/realms/<realm_name>/broker/bcsc/endpoint`)
4. Prepare any application changes and updated SSO configuration in preparation of re-deploying
5. Notify/schedule with Wesley when you re-deploy and he will update the BCSC configurations at the same time. Post deployment, immediately you should be able to test out for non-Production environments.
6. Schedule with Wesley a Production service maintenance window to do the same. Update both the SSO configuration and BCSC integration and testing of production application login.


### Where do I get help if my app doesn't work after the change is complete?

- Please post in #sso RocketChat channel, including the realm ID, environment, detailed description of the issue.
