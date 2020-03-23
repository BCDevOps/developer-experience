---
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
  - Designer
tags:
  - openshift
  - new
  - onboarding
  - project set
  - devops
description: Learn where to ask for help with issues not covered by devops-requests
---

# Onboarding Outcomes

This document is primarily for the use of those teams who have already had an onboarding meeting with the Platform Services team,
but it contains plenty of useful information for everyone else, too!

## Our Expectations for You

As one of the vanguard of openness and agility in government, your presence on the Openshift Platform comes with some expectations.
At their core, these expectations boil down to one thing: **Leadership**. You're here to explore a new, more digital government.
You're building the path that others will follow. That means that you will be expected to help others to follow that path.

### A Community Supported Platform

In short, this just means one thing: help each other. If you're having problems - with *anything* to do with being a DevOps team - **your first stop for help should be the community.**
This refers to both the Developer Exchange community, and the larger development community on the web.

When you're having a non-urgent question or a problem, your first stop should be to seek out the rest of the community.  RocketChat's #devops-how-to channel is always a good place to start.  You can also seek out help from the community that exists around your chosen open-source tools on the wider web, as well.

Use RocketChat's #devops-sos for urgent **production** issues only. 

It also means that you should be keeping a close eye on Rocketchat yourself, and offering support to other teams as they encounter problems. It's a two-way street!

If you're from elsewhere in government, this is probably a process that is different from what you're used to - normally, you'd call 7-7000 and someone else would swing in to fix it for you.
Self-service cuts both ways: you have all kinds of freedom and flexibility, but it also means responsibility. The more you provide your support to others, the more others will be able to support you.

However, if you suspect a problem with *the platform itself* (such as an outage), head on over to [our status page](https://status.pathfinder.gov.bc.ca) or #devops-alerts and/or #general on RocketChat to see if we are already aware of a platform-wide problem. 
If you don't see anything there, then #devops-operations is a good place to start. However, you should always be *sure* that it's a platform issue before posting there. If you're not sure, start on #devops-how-to to see if you can get some help with that.

### An Open Platform

Open is the name of the game. If it can be open, it should be. If it can't be open, you should aim to fix it so that it can.

All of our teams' code is open-source and available on the bcgov github organization.

If you need some time/support getting your code into a state where it can be made open-source, we have some options for that as well. Rocketchat is a good place to ask about those options.

### Communication

It's probably pretty clear already that Rocketchat is core to our operations here at the Dev Exchange.
Unsurprisingly, this means that we require every team on the platform to have Rocketchat accounts for everyone on that team.
The majority of our users don't need to do anything to get access - all you need is an IDIR or GitHub account.

You can find some specific steps for joining RocketChat [here](https://developer.gov.bc.ca/Steps-to-join-Pathfinder-Rocket.Chat).

You will be required to have a RocketChat account before you are able to do much of anything else on the platform, so don't delay.

### Your Team

When you join the platform and the exchange, you should have (or be working on getting) a team that is able to follow the agile process that are core to our work here.
Every team on the platform *must* have a Product Owner and a Technical Steward (and these people should both be BCGov employees whenever possible).
Your team also *should* have a Scrum Master and at least one DevOps Specialist on board. These aren't strictly *required*, but long experience does tell us that you're going to have a Bad Time if you don't have these positions filled.

## Your Expectations for Us

We are here to help you as much as we can, but we take the community-supported self-service model very seriously, and so here we will discuss what you should (and shouldn't!) expect the Platform Services Team to provide for you.

### Community-Wide Tools

One of our primary mandates is to provide the whole community with a suite of tools that will allow you to make full use of the platform. At the moment, these include:
* RocketChat (https://chat.pathfinder.gov.bc.ca or download an app), on-prem hosted
* Keycloak Single Sign-On and Federated Identity Service (https://sso.pathfinder.gov.bc.ca/), on-prem hosted
* Aporeto (coming in the new OCP 4 Platform in summer 2020), on-prem and SaaS components
* Documize Document Management (https://docs.pathfinder.gov.bc.ca/), on-prem hosted, supports public and protected content
* GitHub - online code management for open-source projects SaaS, all government repos are part of  the **bcgov** organization.
* ... and obviously the platform itself, Openshift.

We are also working on rolling out new tools for the community to use. We are always interested in hearing recommendations for more - just make sure that, whatever you suggest, it's something that would be useful to the *community* and not just your team!

### Platform Support

We support the platform, making sure that it works properly and that it is available for everyone to use. It is *not* tech support for the platform. Here's a good example of the difference:

* If you're having problems getting your Rocketchat application to work, that's a *community* support issue.
* If you suspect that the RocketChat service is having an outage, that's a *platform* support issue.

It is our responsibility to make sure that the services we provide are available and stable.

### Common Components

Part of the community support model also means that teams can and should make sure that they're not re-inventing the wheel.
If your team makes a login script, it's very likely that such code would be useful to other teams. However, we also understand that making that code modular and generalized for use by other teams isn't always easy.
To that end, we have a whole team dedicated to the creation of such components, as well as supporting teams who want to provide easy-to-use components to other teams.

You can find them at #team-coco on RocketChat

## Tips on asking for help on RocketChat (and anywhere else!)

A good question is more likely to get an answer - and they're likely to get a better answer more quickly, too!

To that end, you'll want to include plenty of detail. Generally speaking, you should include the following:

1. **What are you trying to do?** Provide plenty of detail about exactly what you're hoping to achieve. What end result are you looking for?
2. **How are you trying to do it?** Provide details about what you've already done to solve your problem and what tools you're using. If you're having problems logging into rocketchat, are you using IDIR or Github? Website or App? On Windows or Mac? Include all the details you can think of!
3. **What kind of help do you want?** What is it that you're hoping the community can provide for you?
4. **Why are you trying to do it?** Why is this important in the first place? Maybe there's another simpler way that can serve your purpose - it's important for the community to know that, too!

Granted, not all of these questions will apply to all problems, but err on the side of including more information if you're not sure. 
