---
description: To grant or remove access for a team member to BCGOV GitHub repositories and Openshift.
title: 'User access into Github or Openshift'
tags: 
  - github-membership
  - openshift access
---

## What we use GitHub Org Membership for

There are three GitHub orgs that are managed by BC Government:
- __bcgov__: 
  - __Is used__ for public repositories and contains all open-source code owned by BC Government. 
  - Membership in this organization is required to create new repositories in the organization.
  - **You do not need org membership to contribute to these repositories.**
  -  Membership requests submitted for a new member by an existing member are **approved automatically**. Platform Services Team's approval is required for the requests submitted by a user for themselves.
- __BCDevops__: 
  - Is used for devops specific tooling and issue tracking related to the Openshift 4 Platform.
  - __Is not used__ for public BC Government applications/projects 
  - Membership in **BCDevOps** org is required to access [__Openshift 4 Silver Cluster Console__](https://console.apps.silver.devops.gov.bc.ca/dashboards).
  - You do not need org membership to contribute to these repositories.
  -   Membership requests submitted for a new member by an existing member are **approved automatically**. Platform Services Team's approval is required for the requests submitted by a user for themselves
- __bcgov-c__: 
  - __Is used__ for private repositories and contains code for closed-source projects.
  - Org membership is required to create private reports and all requests require Platform Services Team's approval as a new user license needs to be procured. Submit a request for a private org membership [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=)


## Changes to Github Organization Membership Requests

There have been changes to the Github Access management workflow to __better automate__ the process. Please read the details below. There is also a [YouTube video describing the workflow](https://www.youtube.com/watch?v=IvdPyx2-qm0)

### Requesting membership to bcgov and BCDevOps orgs

If you are making a simple request to invite someone or yourself to the bcgov or BCDevOps organizations in GitHub, this can now be done with the
[Platform Service's Github Access Management Tool](https://just-ask.developer.gov.bc.ca/). You do not need to open a ticket or create a GitHub issue anymore, please use the app for all org membership requests. 

If you are a member in bcgov or BCDevOps org and are inviting another user to the org, your request will be approved automatically and processed right away.  The invited user will get an invite in the email to join the org. Only after the invite is accepted, the membership will be granted to the invited user's GitHub ID account.

If you are __asking to invite yourself to an org__ please note that the request will **not** be automatically approved. The Platform Services Team will need to review the request to confirm your affiliation with the BC Government before it can be approve. Send an email to **PlatformServicesTeam@gov.bc.ca**  with the following details - indicate in the request if you are a government employee or include the name of the project and Ministry that you are working on, if you are a contractor, to expedite the approval process. If your request is urgent, please ping one of our Platform Admin @patrick.simonian @cailey.jones or @shelly.han in [#devops-operations](https://chat.developer.gov.bc.ca/channel/devops-operations) channel in Rocket.Chat.

### Requesting membership to bcgov-c

These requests are not fulfilled through this issue. Typically requesting access to a private repo is done at the repository collaboration level. You will need to get in contact with the repo admin for access. If you are seeking to create **a new private repository** see [Requesting a Private Repository](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan%2C+mitovskaol%2C+patricksimonian&labels=github-repo%2C+pending&template=github_repo_request.md&title=)

