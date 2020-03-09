### KeyCloak Service Migration

Hi team, we are in the process of transforming KeyCloak from a pathfinder service to an organizational BCGov service. For more information on this Single Sign-On service, refer to [here](https://developer.gov.bc.ca/BC-Government-SSO-Service-Definition).

Part of the migration requires you (application teams using this existing SSO) to update the KeyCloak configurations. As for now, there is no immediate actions. We will inform the community in [RocketChat #sso channel](https://chat.pathfinder.gov.bc.ca/channel/sso) when ready so that you could plan ahead for some sprint time to work on the relevant tasks.

At the moment, we are collecting application team information for each KC realm. Please visit the GitHub issue (or rocketchat discussion) [here](tbd) and provide the details listed:
- Project Name: 
- KC realm ID: 
- OpenShift project set/s: 

If your team is not on the OpenShift platform, please provide contact information for:
- Product owner: 
- Technical lead: 


Here are the migration plan phase for SSO admin team:
- test out the impact on KeyCloak in a multi-domain setup: done
- provision new DNS and certs: in progress
- collect project team contact information for future notice: in progress
- migrate the service to the new DNS

More details on the the current status:
- Link for the Epic: https://app.zenhub.com/workspaces/developer-experience-5bb7c5ab4b5806bc2beb9d15/issues/bcdevops/developer-experience/144
- Link to progress: [doc](./kc-admin.md)
