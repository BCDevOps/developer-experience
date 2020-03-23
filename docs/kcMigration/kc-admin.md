## This tracks the progress of the migration testing:

[x] spin up a sandbox KC instance on R0, with similar realm and client setups

[x] create a separate route (R1) for KC and connect to it

[x] setup an app that use SSO, and switch configuration between R0 and R1. Test with different types:
  - [x] single app: RocketChat
  - [ ] frontend + backend: reggie
  - [ ] multiple applications in one realm: RC + reggie + KC auth flow


[x] test multi-domain setup in single instance (R0 as current existing hostname, R1 as new migration hostname):
  - action: when only have R1 redirect
  - result: user will see `Invalid parameter: redirect_uri` when hitting the client in IDP-realm

  - action: then start to update IDP settings (IDP + IDP-realm's client)
  - result: notice that the IDP's `Redirect URI` changes based on the route used to visit it, which doesn't affect the usage!

  - action: no IDP update, just including R1 in IDP-realm (add in the client's redirect uris)
  - result: works

  - action: try creating new IDP with all R1, with same IDP name
  - result: doesn't work, IDP name conflict

  - action: try creating new IDP with all R1, with different IDP name
  - result: doesn't work, the redirect of KC doesn't match GitHub oauth app

  - action: update GitHub Oauth app setting
  - result: doesn't work, the IDP's mapper has a different alias that will create a different user record (but same `Provider User ID`) -> which means we are good to continue with the next step
  - note: once updated here, rolling back to R0 will break. Need to update the GitHub callback to R0. 

  - action: instead of creating new IDP, try updating the existing IDP
  - details: first update the client in the IDP realm to use R1, add R1 `valid redirect uri` (both R0 and R1 should exists); then update the `oidc config` IDP in the app realm to use R1
  - result: works! The same GUID returned for the user

  - *action on app team*
  - action: switch application's KC settings
  - result: now that both R1 and R0 work fine. If not working, figure out which part is missing!

  - *action on app team*≈
  - action: test customized authentication flows and themes
  - result: 

  - action: update all R0 to R1 in the KC instance
  - details: remove the R0 `valid redirect uri` from the IDP realm's client
  - result: since no reference to R0 anymore, will not break anything

  - action: remove R0 route
  - result: done!


[x] create scripts for the IDP migration

[ ] Optional: test multi-domain setup in two instances:

[ ] setup traffic monitoring on the old KC instance:
