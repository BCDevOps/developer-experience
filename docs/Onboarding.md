## Onboarding to the Platform

Whether you have a team or not, the first step in your journey to delivering apps in the platform is a 30 minute in-person (or online) 
__alignment meeting__. This meeting will highlight the capabilities of the platform, what is needed from you and the team, as well as the
platform support model. 

## Alignment

All projects start with an alignment meeting between the BC Gov Openshift Platform Services product owner and the business area's 
sponsor/product owner. 

### What's it about?

Platform capabilities are discussed:
- it is a containerized platform
- container images are securely stored
- cloud native app architectures work best in this environment
- only new apps are being built on the platform
- __the platform is not a data store__
- resource quotas (memory, cpu, storage)
- associated costs

Platform Patterns:
- the application(s) must have a dedicated team and product owner for its operating lifetime
- the application(s) can be built by vendors but require atleast 1 BC Gov employee with administrator access to the namespace set
- the team is provided a namespace/project set of __four__ named `dev`, `test`, `prod`, and `tools`.
- each namespace has dedicated quota in the form of memory, cpu, and storage
- the team is encouraged to take training to learn more about the platform (Openshift 101/201)


Communication:
- [Rocket.Chat](https://chat.pathfinder.gov.bc.ca) is the primary means of communications, platform updates, troubleshooting
- [Status Page](https://status.developer.gov.bc.ca) is the primary status keeper of platform supported tools


### How Do I Book an Alignment Meeting?

To start the alignment meeting process, [make an Openshift Project Set Request](https://github.com/bcdevops/devops-requests/issues/choose) and fill out the details. You will be contacted by the platform team to schedule an alignment meeting after. 
