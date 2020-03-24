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

# Welcome to our Platform Community! 

Glad you’re here! If you’ve already had your onboarding meeting with the Platform Services team, you’ll find this follow-up info helpful as part of your welcome package to our community. If you’re just scoping us out, we hope you like what you learn and welcome you to join our journey.  

## We’re Better Together

Dreamers. Vanguards. Innovators. We’re all creating lasting change by moving our government into a brave new world of openness and agility. **We can’t do it alone and we don’t pretend we can.** So, we’re holding hands and setting off on an adventure together to go towards something greater.

You’re here to explore a new, more digital government. You’re building the path that others will follow. You’re the leader that you always wish you had, and with the right people by your side, you’ll have the courage to keep going.

Try. Experiment. Iterate. Fail. Try again. Change the world, together.

## What this means for you

In short, it means that the value you bring to this community is not just what you take away for yourself, but what you give back. **Your value is determined by what you do for others**. You get to work with a sense of purpose, cause and belief as you contribute to something even bigger than your own project. Not bad for a paid gig.

### A Community-Supported Platform

Our Platform is supported by our community. Quite simply, this means: we help each other. **Your first stop for help should always be the community**. This refers to both the Developer Exchange community, and the larger development community on the web.

* Don’t know what to do? Say it out loud to our community and someone who does know will offer help.
* Holding onto a great idea, or have a brilliant answer? Contribute it and watch the community come together to evolve it together.  

As part of our community, you’ll need to keep a close eye on our communication channels (especially RocketChat) to contribute and offer support to other teams as they encounter problems. **The stronger we get as individuals, the stronger those around us become too**. 

#### Non-urgent question or problems

Dial-in the community. RocketChat’s `#devops-how-to` channel is always a good place to start. You can also seek out help from the community that exists around your chosen open-source tools on the wider web, as well.

#### Urgent production issues

Head straight to RocketChat’s 911 channel: `#devops-sos`

#### Platform issue (i.e., suspected outage)

Hop onto our [status page](https://status.pathfinder.gov.bc.ca), or RocketChat `#devops-alerts` and/or `#general` to see if we’re  already aware of a Platform-wide problem. If you don't see anything there, then RocketChat `#devops-operations` is a good place to begin. However, you should always be sure that it's a Platform issue before posting there. If you're not sure, start on RocketChat `#devops-how-to` to see if you can get some help there.

If you're from elsewhere in government, this support model is likely different from what you're used to. Normally, you'd call 7-7000 and someone else would swing in to fix things up for you. Self-service cuts both ways: you have all kinds of freedom and flexibility, but it also means responsibility. The more you provide your support to others, the more others will be able to support you.

### An Open Platform

A community isn’t a group of people who simply work together. A community is a group of people that trust each other.  On an Open Platform, “Open” is the name of the game. If it can be open, it should be. If it can't be open, you should aim to fix it so that it can.

All of our teams' code is open-source and available on the [bcgov github organization](https://github.com/bcgov/).

If you need some time and/or support getting your code into a state where it can be made open-source, we have some options for that as well. RocketChat is a good place to ask about those options. Again `#devops-how-to`

### Communication

It's probably pretty clear already that **RocketChat is core to our operations here at the Dev Exchange**. Unsurprisingly, this means that we require every team on the Platform to have RocketChat accounts for everyone on that team. The majority of our users don't need to do anything to get access—all you need is an IDIR or GitHub account.

You can find some specific steps for joining RocketChat [here](https://developer.gov.bc.ca/Steps-to-join-Pathfinder-Rocket.Chat).

You’ll need a RocketChat account before you’re able to do much of anything else on the Platform, so don't delay.

### Your Team

When you join the Platform and the Exchange, you should have (or be working on getting) a team that is able to follow the agile process that are core to our work here. 

Every team on the Platform must have a **Product Owner** and a **Technical Steward**.  These people should both be BCGov employees. There are exceptions, however experience has taught us the life of your products will suffer without BCGov staff being held responsible.

Your team also should have a **Scrum Master** and at least one **DevOps Specialist** on board. These aren't strictly required, but years of experience does tell us that you're going to have a **bad time if you don't have these positions filled**.

## What’s coming your way from us 

We’re here for you as part of the Platform Services Community. We foster the love in our community-supported self-service model—and take it seriously—so let’s chat about what you should (and shouldn't!) expect the Platform Services Team to provide.

### We Provide Community-Wide Tools

One of our primary mandates is to provide the whole community with a suite of tools that will allow you to make full use of the Platform. At the moment, these include:

* RocketChat (https://chat.pathfinder.gov.bc.ca or download an app), on-prem hosted
* Keycloak Single Sign-On and Federated Identity Service (https://sso.pathfinder.gov.bc.ca/), on-prem hosted
* Aporeto (coming in the new OCP 4 Platform in summer 2020), on-prem and SaaS components
* Documize Document Management (https://docs.pathfinder.gov.bc.ca/), on-prem hosted, supports public and protected content
* GitHub - online code management for open-source projects SaaS, all government repos are part of the bcgov organization.
* ... and obviously the Platform itself: OpenShift.

We’re also working on rolling out new tools for community use. And, we’re always interested in hearing recommendations for more—just be sure that, whatever you suggest, is something that would be useful to the entire community and not just your team!

### We Provide Platform Support

We get up every morning to keep the lights on. Our focus (and passion!) is to make sure the Platform and tools are working properly and are available for everyone to use. That’s Platform support. What we don’t offer is tech support and troubleshooting for general user issues.  Remember that's from the community. Have another look at Community support, above. 

Here's a good example of the difference:

* If you're having problems figuring out how get RocketChat working for you, that's a general troubleshooting issue that the community supports. Reach out to the community for help.
* If you suspect that the RocketChat service is experiencing an outage, that's a Platform tool availability issue and requires Platform support. Reach out to the Platform Services Team for help.

### We Strive For Common Components

Part of the community support model also means that teams can and should make sure that they're not re-inventing the wheel. If your team makes a login script, it's very likely that such code would be useful to other teams. However, we also understand that making that code modular and generalized for use by other teams isn't always easy. To that end, we have a whole team dedicated to the creation of such components, as well as supporting teams who want to provide easy-to-use components to other teams.

You can find them at `#team-coco` on RocketChat

## Final Tips: Asking for help (on RocketChat, or elsewhere!)

A good question is more likely to get an answer - and it’s likely to get a better answer more quickly, too! To that end, you'll want to include plenty of detail:

1. **What are you trying to do?** Provide full details about exactly what you're hoping to achieve. What end result are you looking for?
2. **How are you trying to do it?** Provide full details about what you've already done to solve your problem and what tools you're using. If you're having problems logging into RocketChat, are you using IDIR or Github? Website or App? On Windows or Mac? Include all the details you can think of!
3. **What kind of help do you want?** What is it that you're hoping the community can provide for you?
4. **Why are you trying to do it?** Why is this important in the first place? Maybe there's another simpler way that can serve your purpose—it’s important for the community to know that, too!

Granted, not all of these questions will apply to all problems, but err on the side of including more information if you're not sure.

## We thank you
