---
description: KeyCloak (RH-SSO) Migration from Pathfinder to BCGov service
resourceType: Documentation
title: BC Government KeyCloak (RH-SSO) Service Migration Plan
labels:
- sso service migration
- keycloak host name change
---

## KeyCloak Service Migration

Hi team, the KeyCloak SSO service is finally removing its *Pathfinder* sticker and getting a new name.  This change does not affect the service offering but does change how you will access it.  The name is changing from sso.pathfinder.gov.bc.ca to oidc.gov.bc.ca.  For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

The first step of the migration involving Application teams (who's using the existing SSO) is the collection of project team contact information for each KC realm.  Please visit the Rocket.Chat discussion [here](https://chat.pathfinder.gov.bc.ca/channel/sso-migration), find your realm and provide the details listed:
- Project Name: 
- KC realm ID: 
- OpenShift project set/s: 

If your team is not on the OpenShift platform, please also provide contact information for:
- Product owner: 
- Technical lead: 

At this point, there are no immediate actions required to migrate. Once the new service name(s) are in place, you will be required to update your realm's KeyCloak configurations as well as any application links to the keycloak DNS. Platform services team will inform the community in [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso) as well as product owners as the start date approaches so that you can plan ahead for some sprint time to work on the relevant tasks.

### Migration plan and phases:
Phase 1. ***Platform Services team*** will test out the impact on KeyCloak in a multi-domain setup
- setup in the sandbox environment and test different cases to get an understanding of the potential impacts on application
- status: check out [the doc](./kc-admin.md)

Phase 2. ***Platform Services team*** to provision new DNS and ssl certs
- expected to migrate SSO service to `oidc.gov.bc.ca`
- status: DNS created, waiting for wildcard SSL certs for *.oidc.gov.bc.ca

Phase 3. ***Platform Services team and WAM team*** setup new SiteMinder Federation services 
- request a new set of IDIR and BCeID services for *.oidc.gov.bc.ca
- status: testing out in sandbox environment

Phase 4. ***Platform Services team and BCSC team*** figure out how to migrate BCSC integrations
- status: list of teams provided to BCSC team, pending response

Phase 5. Work with ***sso community*** to collect project team contact information
- so that sso ops team could reach out to all teams on KC for up coming actions
- import metadata into Project Registry
- status: in progress, also building Project Registry

Phase 6. migrate DEV and TEST services to the new DNS
- work with ***pilot teams*** on the migration and identify required actions from application teams
- involve community to provide relative PR as example for teams to follow, online support for debugging and supports
- status: expected to start once previous steps are complete

Phase 7. production migration
- as this might cause temporary downtime on the application, Platform Services will schedule with teams on the date and time to best reduce the business impact
- status: depends on Phase 4, expected to be finished before teams start the migration on OCP



More details on the the current status:
- Link for the Epic: https://app.zenhub.com/workspaces/developer-experience-5bb7c5ab4b5806bc2beb9d15/issues/bcdevops/developer-experience/144
- Link to progress: [doc](./kc-admin.md)
- Follow up/ ask on [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso)
