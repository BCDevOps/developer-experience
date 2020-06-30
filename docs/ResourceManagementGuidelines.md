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

## What Does A Good Platform Citizen Look Like?

:star: :star: :star: 

Having a **3:1 ratio** of CPU Limit:CPU Request is a good starting place for new applications that haven't yet been tuned. Using a 3:1 ratio makes you a **good community member**!

:star: :star: :star: :star: 

Having a **2:1 ratio** of CPU Limit:CPU Request is a great next step for teams whose projects are working and stable, and who are in a position to start tuning their application more effectively - especially those who are seeking to make better use of horizontal scaling.
Using a 2:1 ratio makes you a **great community member**!

:star: :star: :star: :star: :star: 

Having a **1.5:1 ratio** of CPU Limit:CPU Request is an amazing goal for teams who have already started tuning their applications and are looking to make the best possible use of the platform's capabilities. Using a 1.5:1 ratio makes you an **amazing community member**!

## But Wait, Why Do We Want Smaller Ratios?

It might seem initially unintuitive that we are look for a smaller ratio - after all, instinct suggests that we should only request a very small amount, but that it shouldn't matter so much if our upper limit is high, right?

There are two reasons why a lower ratio works better for the platform:

First, a well-built application that makes appropriate use of a containerized architecture will use **horizontal scaling** to obtain more processing power, rather than just increasing the CPU usage on a single pod.
Horizontal scaling means spinning up whole new pods to take on new traffic, rather than simply using up more resources on the current node. 
This is a better option because it allows your application to make better use of the benefits of containerization, and it makes you a better platform citizen because your application's resource demands can be balanced across many nodes.

Second, because the platform tries to accommodate the *limit* value for each pod on each node. 
It isn't required to ensure that the full limit is available to every pod (that would be impossible, in many cases), but it does give best effort, so having a very high limit makes it more difficult to schedule pods effectively.

Here is an example of the two options:

Let's say you have a pod where your request is only 0.5 CPUs, but your limit is 8 CPUs. The platform software is trying to schedule your pod on a node. 
It knows that while it *can* schedule your pod on a node with only 1 CPU available, it would be better if it could schedule your pod on a node with up to 8 CPUs available, just in case your traffic suddenly spikes.
Well, there aren't any nodes with 8 CPUs left available, so it simply does its best and puts your pod onto a node with 6 CPUs available.
Now, if another pod comes along with another very high CPU limit, the platform has a more difficult time guessing whether it should put that pod onto the same node (because you're only using a half a CPU right now, so there is currently 5.5 CPUs left) because it doesn't know whether your pod will suddenly need all 5.5 of those extra CPUs to accommodate spike in traffic.
If it guesses wrong and puts this other pod into the same node, and then a spike *does* occur, your application will be left trying to accomodate a great deal of traffic with maybe only 3 or 4 CPUs out of the 8 you think might be necessary.

On the other hand, let's say you have a pod where your request is 0.5 CPUs and your limit is 0.75 CPUs, and you have robust horizontal scaling. 
The platform is happy to stick that pod on *any* node that has even just 1 CPU left, no problem. It can save spaces on those nodes with 5-6 CPUs for those applications that aren't yet as well-tuned as your is.
And if you have a sudden spike in traffic? Your application can spin up several more nodes very quickly, which can, again, be easily scheduled on pretty much any node, which means that you could potentially have up to 8 CPUs worth of resource claimed during your spike, across countless *different* nodes.
And because your application can be balanced so easily across so many nodes, it's extremely unlikely that you'll end up in competition for the remaining CPU on any single node with another resource-hogging pod.

Given these examples, I think it's very important to recognize something about the way these ratios work:

**Increasing your request values is not a helpful way to reduce your ratios.** 

Doing that might make you *look* like a good platform citizen on the surface, but it's a bit like cheating on a test - getting a good score through such means doesn't mean you actually know your stuff!

