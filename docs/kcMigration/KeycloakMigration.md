### KeyCloak Migration

Hi team, we are in the process of transforming KeyCloak from a pathfinder service to a organizational BCGov service. For more information on this service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

Part of the migration required you (application teams using this existing Single Sign-On service) to update the KeyCloak configurations. As for now, there is no immediate actions. We will inform the community in #sso channel when ready so that you could plan ahead for some sprint time to work on the relevant tasks.

Here are the migration plan tasks for SSO admin team:
- provision new DNS and obtain IDIM approval
- test out the impact on KeyCloak in a multi-domain setup
- plan and migrate to the new DNS

More details on the the current status:
- Link for the Epic: https://app.zenhub.com/workspaces/developer-experience-5bb7c5ab4b5806bc2beb9d15/issues/bcdevops/developer-experience/144
- Link to progress: [doc](./kc-admin.md)
