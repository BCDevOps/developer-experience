---
description: KeyCloak (RH-SSO) Migration from Pathfinder to BCGov service
resourceType: Documentation
title: BC Government KeyCloak (RH-SSO) Service Name Migration Plan
labels:
- sso service name migration
- keycloak host name change
---

## KeyCloak Service Name Migration

The BCGov KeyCloak SSO service is going to switch the service name from `sso.pathfinder.gov.bc.ca` to `oidc.gov.bc.ca`. This change does not affect the service offering but does change how you will access it. For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).


### Migration Plan and Phases:
Here are the phases of service migration, check out detail status in the next section. Dates and times will be communicated on [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso) and via Service Bulletins.

Phase 1. ***Platform Services team*** will test out the impact on KeyCloak in a multi-domain-name setup
- setup in the sandbox environment and test different cases to get an understanding of the potential impacts on application

Phase 2. ***Platform Services team and WAM Team*** to request for services and certificates
- DNS and ssl certs for oidc.gov.bc.ca
- set of new SiteMinder Federation services (IDIR and BCeID)

Phase 3. ***Platform Services team*** start communication and enable the new DEV services
- work with ***product teams*** on the verifying and identifying issues and actions
- ***product teams*** start to update application SSO integration, identify issues and actions

Phase 3.1. figure out the process for product teams to update BCSC configuration if needed
- work with ***pilot teams*** and ***BCSC team*** to figure out how to migrate BCSC integrations

Phase 4. ***Platform Services team*** enable the new services name for TEST and then PROD SSO
- ***product teams*** continue to update application SSO integration in test and prod environment

Phase 5. ***Platform Services team*** monitoring the progress of migration
- traffic monitoring on pathfinder SSO service
- work on service forwarding POC

Phase 6. ***Platform Services team*** OCP4 migration
- if service forwarding POC is successful, migrate keycloak instances to OCP4 without waiting for all product teams complete SSO service configuration update. As this might cause temporary downtime on SSO service, Platform Services will schedule with teams on the date and time to best reduce the business impact
- shutdown sso.pathfinder.gov.bc.ca


## Progress Tracking:

### Prep work for testing out effects on a new service name for KeyCloak:
- [x] spin up a sandbox KC instance with service name `R0 (sso-sbox.pathfinder.gov.bc.ca)`, with similar realm, client and IDP setups in prod
- [x] create a separate route `R1 (sbox.oidc.gov.bc.ca)` for KC and connect SSO service to it
- [x] setup an app that use SSO, and switch configuration between `R0` and `R1`. Test with different types:
  - [x] single app: RocketChat
  - [x] frontend + backend app: reggie
  - [x] with different Identity Providers
- [x] track test results (see section `Details of pre-testings done`)
- [x] iStore orders for new oidc DNS and SSL Certificates
- [x] work with WAM team to setup SiteMinder federation services (for IDIR and BCeID) for the new URLs
  - sbox IDIR
  - sbox BCeID
  - dev IDIR
  - dev BCeID
  - test IDIR
  - test BCeID
  - prod IDIR
  - prod BCeID


### Automate the service name enabling tasks:
Create scripts for enabling new service name and config internal KeyCloak references ([code](https://github.com/BCDevOps/keycloak-admin/pull/18)):

- [x] step 1 - get all IDP agent realms, IDP configurations, and clients for each app realm usage (IDPs including `IDIR`, `BCeID` and `BCGov-GitHub`)
- [x] step 2 - get all APP realms (other than IDP realms), and the existing IDPs in each realm
- [x] step 3 - sanity checks: compare if IDP client list match all app realm list
- [x] step 4 - update IDP agent realm settings, specifically Identity Provider configurations and mappers
- [x] step 5 - update client configuration in IDP realms for all APP realms
- [x] step 6 - update BCGov IDP settings in each APP realm
- [x] step 7 - roll back strategy: currently the idea is to restore database


### Monitoring and status tracking:
- [ ] expend Platform Service Project Registry with KeyCloak metadata
  - skip this step till later
  - notifications will be sent out via RocketChat channels as well as Tibs and Product Owner emails

- [ ] POC of traffic monitoring on the old KC instance
  - this helps us to keep track on production teams progress

- [ ] POC of service forwarding agent/app
   - if this POC is successful, we would start the actual KeyCloak instance migration to OCP4 before all product teams complete SSO service configuration update


### Details of pre-testings done (record tracking):
Test multi-domain-name (multiple service route connecting to the same service) setup in single instance:
  - [x] action: when only have R1 redirect
  - result: user will see `Invalid parameter: redirect_uri` when hitting the client in IDP-realm

  - [x] action: then start to update IDP settings (IDP + IDP-realm's client)
  - result: notice that the IDP's `Redirect URI` changes based on the route used to visit it, which doesn't affect the usage!

  - [x] action: no IDP update, just including R1 in IDP-realm (add in the client's redirect uris)
  - result: works

  - [x] action: try creating new IDP with all R1, with same IDP name
  - result: doesn't work, IDP name conflict

  - [x] action: try creating new IDP with all R1, with different IDP name
  - result: doesn't work, the redirect of KC doesn't match GitHub oauth app

  - [x] action: update GitHub Oauth app setting
  - result: doesn't work, the IDP's mapper has a different alias that will create a different user record (but same `Provider User ID`) -> which means we are good to continue with the next step
  - note: once updated here, rolling back to R0 will break. Need to update the GitHub callback to R0. 

  - [x] action: instead of creating new IDP, try updating the existing IDP
  - details: first update the client in the IDP realm to use R1, add R1 `valid redirect uri` (both R0 and R1 should exists); then update the `oidc config` IDP in the app realm to use R1
  - result: works! The same GUID returned for the user

  - *action for app team*
  - [x] action: switch application's KC settings
  - result: now that both R1 and R0 work fine. If not working, figure out which part is missing!

  - *action for app team*
  - [x] action: test customized authentication flows and themes
  - result: no effects as long as there's no reference to R0

  - [x] action: update all R0 to R1 in the KC instance
  - details: remove the R0 `valid redirect uri` from the IDP realm's client
  - result: since no reference to R0 anymore, will not break anything

  - [x] action: remove R0 route
  - result: all good


### Should you have any questions, contact us on [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso)
