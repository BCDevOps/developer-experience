---
title: Resource Management Guidelines
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
  - Designer
tags:
  - openshift
  - resources
  - claims
  - project
  - devops
description: How to appropriately manage your resources to be a good platform citizen
---

# Resource Management Guidelines

Resource management is a vital skill for working on the platform. It’s something teams need to learn so they can work cooperatively with others on the platform.

Once your team starts making use of the platform, you'll need to consider what it means for your team to be a good platform citizen.
Resource management is about teams ensuring they make fair use of our shared resources. 
In other words, if we give a little to others, we can get some of what we want as well!

Teams can learn a lot about appropriate resource management from other teams. When more experienced teams model good resource management on the platform, it gives newer teams a great example to follow.

This doesn't mean that you'll be unable to resource what you need or that your team will have to make do with fewer resources than they'd like.
Instead, resource management is about making sure that your team isn't claiming resources you aren't using, which could be put to better use by other teams who might need those resources.


## Resource Management Terms

There are three different types of resource on the platform which need to be managed:
1. CPU
2. Memory (aka RAM)
3. Storage

Our biggest concern is generally with CPU - it has the highest potential to vary, and it tends to be the limiting factor in adding new projects to the platform.

When building a deployment, you can specify a range for each of these resources - a minimum amount that your pod needs (this is called the **request**) and a maximum amount it is allowed to use (this is called the **limit**)
So a CPU Request would be the minimum amount of CPU you would like to reserve for your pod when it is running.

Your *usage*, meanwhile, is the amount of CPU that your application actually uses at any given time.


## What Does A Good Platform Citizen Look Like?

:star: :star: :star: 

Having a **3:1 ratio** of CPU Request:CPU Usage is a good starting place for new applications that haven't yet been tuned. Using a 3:1 ratio makes you a **good community member**!

:star: :star: :star: :star: 

Having a **2:1 ratio** of CPU Request:CPU Usage is a great next step for teams whose projects are working and stable, and who are in a position to start tuning their application more effectively - especially those who are seeking to make better use of horizontal scaling.
Using a 2:1 ratio makes you a **great community member**!

:star: :star: :star: :star: :star: 

Having a **1.5:1 ratio** of CPU Request:CPU Usage is an amazing goal for teams who have already started tuning their applications and are looking to make the best possible use of the platform's capabilities. Using a 1.5:1 ratio makes you an **amazing community member**!


## What Does This Mean For Me?

It's important to realize your request *reserves* a certain amount of CPU for your pod's use. Nobody else can use that CPU, even if you're not using it at all.
It's probably quite obvious why this might result in some issues with sharing resources - it's possible to reserve 8 CPUs when your application actually only uses about a half a CPU.
This means you're hoarding a *lot* of  CPU that you won't actually use.

Now, sometimes this happens purely by mistake - new teams that join the platform don't always know what an appropriate use of CPU might look like, so they make their best guess, and they may be wrong.
Learning what your application actually needs can be a long-term process that you don't need to perfect right away.

Sometimes this happens because teams don't fully understand the difference between "request" and "limit" - if you specify only a limit when deploying your pod, the platform will automatically set your request as being *equal* to your limit;
the limit is supposed to be a *maximum* amount of resource used during spikes of high traffic, and so is clearly too much for normal use.

And sometimes this happens because teams fear what might happen during a spike in traffic if they don't reserve a whole bunch of additional processing power.
The thought is that, if their application requires 3 CPUs during peak usage for a few hours per day, they should request all 3 CPUs at all times.
But that's the point of limits - your application can (and will) use more CPU than your request if it needs to, and the platform is quite good at ensuring that such extra CPU is available.

Ideally, however, your application wouldn't use high limits to accommodate spikes in traffic. Instead, you would use something called **horizontal scaling** where your application spins up a whole new pod to accommodate an increase in traffic.
This solution is even *better* than using a high CPU limit, because it makes it easier for the platform to spread the load of your application across lots of nodes - and that's good for both your application *and* the community as a whole!


## How Do I Start?

The Platform Team regularly contacts those teams with very large ratios to encourage them to shrink them down a little - this would be a good way to get started. 
We are also hard at work on developing an easy-to-use dashboard where you'll be able to check your ratio at a glance!

In the meantime, check out the "Metrics" tab for your running pods the Openshift console to get an idea of how much CPU you're actually using compared to how much you have requested.
Your team can use the information found in our [Application Resource Tuning](https://github.com/BCDevOps/developer-experience/blob/master/docs/resource-tuning-recommendations.md) document for some guidance on how to start looking for the right request and limit values!
