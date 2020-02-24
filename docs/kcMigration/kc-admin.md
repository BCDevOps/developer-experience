## This tracks the progress of the migration testing:

[x] spin up a sandbox KC instance on R0, with similar realm and client setups

[x] create a separate route (R1) for KC and connect to it

[x] setup an app that use SSO, and switch configuration between R0 and R1

[x] test multi-domain setup in single instance:
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

  - action: instead of creating new IDP, try updating the existing IDP everything from R0 to R1 (and optionally the clientID)
  - result: works! The same GUID returned for the user


[ ] test multi-domain setup in two instances:

[ ] test KC instance migration on platform:

[ ] setup traffic monitoring on the old KC instance:
