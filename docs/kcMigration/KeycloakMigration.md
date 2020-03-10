---
description: KeyCloak (RH-SSO) Migration from Pathfinder to BCGov service
resourceType: Documentation
title: BC Government KeyCloak (RH-SSO) Service Migration Plan
tags:
- sso service migration
- keycloak host name change
---

## KeyCloak Service Migration

Hi team, we are in the process of transforming KeyCloak from a pathfinder service to an organizational BCGov service. For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

Part of the migration requires you (application teams using this existing SSO) to update the KeyCloak configurations. As for now, there is no immediate actions to migrate. We will inform the community in [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso) as well as product owners when ready so that you could plan ahead for some sprint time to work on the relevant tasks.

At the moment, we are collecting application team information for each KC realm. Please visit the rocketchat discussion [here](to-be-generated), find your realm and provide the details listed:
- Project Name: 
- KC realm ID: 
- OpenShift project set/s: 

If your team is not on the OpenShift platform, please provide contact information for:
- Product owner: 
- Technical lead: 


### Migration plan and phases:
Phase 1. test out the impact on KeyCloak in a multi-domain setup
- setup in the sandbox environment and test different cases to get an understanding of the potential impacts on application
- status: check out [the doc](./kc-admin.md)

Phase 2. provision new DNS and ssl certs
- expected to migrate SSO service to `oidc.gov.bc.ca`
- status: requests in progress

Phase 3. collect project team contact information
- so that sso ops team could reach out to all teams on KC for up coming actions
- status: in progress

Phase 4. migrate DEV and TEST services to the new DNS
- work with pilot teams on the migration and identify required actions from application teams
- community involvement: relative PR as example for teams to follow, online support for debugging and supports
- status: expected to start once previous steps are complete

Phase 5. production migration
- as this might cause temporary downtime on the application, we will schedule with teams on the date and time to best reduce the business impact
- status: depends on Phase 4, expected to be finished before teams start the migration on OCP



More details on the the current status:
- Link for the Epic: https://app.zenhub.com/workspaces/developer-experience-5bb7c5ab4b5806bc2beb9d15/issues/bcdevops/developer-experience/144
- Link to progress: [doc](./kc-admin.md)
- Follow up/ ask on [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso)
