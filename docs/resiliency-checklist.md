---
title: Resiliency Guidelines
resourceType: Documentation
personas: 
  - Developer
tags:
  - openshift
  - ha
  - high availability
  - resilient
  - devops
description: How to design your application to have as much uptime as possible.
---

# Resiliency Guidelines

One of the most amazing benefits of working on the Openshift Platform is that, when your application has been designed with a few key ideas in mind, you can avoid many of the regular outages that are almost unavoidable on legacy infrastructure.
All that time you used to spend with your application down because you needed to patch a server? Gone.
If a node needs to go down for patching purposes, a correctly designed application can simply spin up another pod on another node, and your users won't even notice.

## What does "Correctly Designed" mean?

In order to take advantage of this feature of the cluster, the development team will have to take a design approach that's a little different from legacy design methods.
In short, this means that your application needs to be **highly available** - it should have multiple pods running simultaneously on different nodes. That way, if one pod goes down (because, for example, it was running on a node that is being evacuated for patching), the others - which will be on different nodes - will continue to chug along without issue and none of your end users will even notice.
The pod that went down will restart automatically on another node.

All you need to do is make sure that your application takes advantage of this through some specific design requirements:

### Monitor Your Application!

Monitoring a alerting to issues are key! Regardless of the effort you put into availability and robustness, things happen.
Your ability to respond to things in a timely manner may be the single most effective tool at your disposal to make sure that your application is up.

Monitoring can be performed through health checks - these are scripts which check for a certain outcome on your pod, and can alert you if the expected outcome doesn't occur.
They can be a great first indicator of problems, and can also cause the pod to restart on its own, which may be enough to fix the issue without requiring your intervention.

There are other options for monitoring as well, but these often vary depending on the specific nature of the project/application in question.

### Set up your application to be Highly Available!

You should have multiple accessible pods running your application at once - **three is the ideal minimum**.
If any single pod fails, you will still have two other pods in operation while your broken pod recovers.
In the case of most applications, this is relatively straight-forward and is covered in our [Openshift 101](https://developer.gov.bc.ca/ExchangeLab-Course:-Openshift-101) course.
It can be a little more complicated to set up a highly available database, depending on your database of choice.
If you're looking to use Postgres, check out [Patroni](https://github.com/BCDevOps/platform-services/tree/master/apps/pgsql/patroni) - an open-source, highly-available version of Postgres for use on containerized platforms.

### Ensure you have regular backups taken of your database(s). 

If data recovery is necessary, having access to regularly updated off-site data is key to that process.
You'll also want to script the recovery of those databases regularly. 
Scripting your data recovery can often mean the difference between bringing your application back up in 5 minutes or 5 hours.
If you're using Patroni or MongoDB, there is a [backup-container](https://github.com/BCDevOps/backup-container) application developed by and for the community that can help you get started.

### Follow implementation-as-code best practices. 

The deployment scripts should be kept up-to-date in your Github repo. 
If you need to recover by rebuilding from Github, keeping these scripts up-to-date means that you can have your application up and running again nearly at the push of a button, instead of having to fiddle with settings.

## Community Support

You may note that this document is pretty vague about the "hows" of these principles. This is because it can vary from application to application, and technology stack to technology stack.
The design needs for a highly available chat application are very different from those of a highly available static website. 

This is where the community comes in - if you have a highly available application, please feel free to fork this document and add links to examples from your application (along with information about your stack and any explanations you feel might be necessary).
The more you reach out to help your fellow developer, the stronger a community we will be!

And it's very important to remember that we in the BC Government are part of a larger, international community of developers working to create better and more resilient applications.
There are a lot of great resources available on the broader internet that we could never hope to match on our own. A great place to start when looking into these resources would be https://12factor.net/.

### DTS

There are a number of great examples of resilient apps at DTS, with publicly available dashboards providing information about accessibility and uptime:
- https://uptime.vonx.io/
- https://tools.uptime.vonx.io/
- https://dev.uptime.vonx.io/
- https://test.uptime.vonx.io/
- https://prod.uptime.vonx.io/

We have a variety of alert options to inform us of a problem with our pods or services, and recieve notifications via email and/or RocketChat if there is a problem.

Here are some additional steps that we take to ensure as much uptime as possible:
- Setup auto-scaling on pods (services) where ever possible. This way you can set the minimum and maximum number of instances and the number will automatically adjust to load. A minimum of 2 pods is sufficient in the majority of cases if you’re resource constrained, 3 is best. The DTS team has some services that scale to 16 or more instances under load to increase performance.
- When this is not possible make sure you’re service can restart quickly, that way if it does go down, OpenShift (Kubernetes) can get a new instance back up fast.
- Setup meaningful health checks and liveliness probes on your applications. This way OpenShift (Kubernetes) can monitor the health and liveliness of your application instances. This allows instances to be taken offline, or even killed and replaced automatically when needed. Without health checks a defunct application instance could remain running or online indefinitely.
- Use HA instances of services where ever possible. There are HA instances or Postgres (Patroni), MongoDb, and Rabbit Message Queue to name a few. These services typically have 3 pod instances and operate as a cluster.
- Use monitoring and alerting. Having an HA setup is never enough. If you don’t monitor it, you’ll never know if it’s working. Don’t rely on your customers and users to tell you your system is down. Ultimately you need to be in a position to resolve issues before the users even realize there was an issue, or be able to send out service alerts letting people know you’re aware of an issue and actively dealing with it (before they know about it).
- Don’t forget your backups. Things like the [BCDevOps/backup-container](https://github.com/BCDevOps/backup-container) make that easy.
