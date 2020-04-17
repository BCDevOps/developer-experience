---
title: Resiliency Checklist
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

# Resiliency Checklist

One of the most amazing benefits of working on the Openshift Platform is that, when your application has been designed with a few key ideas in mind, you can avoid many of the regular outages that are almost unavoidable on legacy infrastructure.
All that time you used to spend with your application down because you needed to patch a server? Gone.
If a node needs to go down for patching purposes, a correctly designed application can simply spin up another pod on another node, and your users won't even notice.

## What does "Correctly Designed" mean?

In order to take advantage of this feature of the cluster, the development team will have to take a design approach that's a little different from legacy design methods.
In short, this means that your application needs to be highly available - it should have multiple pods running simultaneously on different nodes. That way, if one pod goes down (because, for example, it was running on a node that is being evacuated for patching), the others - which will be on different nodes - will continue to chug along without issue.
This means that the pod that went down can restart automatically on another pod, and none of your end users will even notice.

All you need to do is make sure that your application takes advantage of this through some specific design requirements:

### Set up your application to be Highly Available. 

In short, this means you should have multiple accessible pods running your application at once - three is the ideal minimum.
If any single pod fails, you will still have two other pods in operation while your broken pod recovers.
In the case of most applications, this is relatively straight-forward and is covered in our Openshift 101 course.
It can be a little more complicated to set up a highly available database, depending on your database of choice.
If you're looking to use Postgres, check out Patroni - an open-source, highly-available version of Postgres for use on containerized platforms.

### Ensure all of your containers have appropriate health checks. 

A health check is a simple script that activates on a schedule. 
If the expected response does not return in a certain amount of time, the container can be restarted, which often is enough to fix whatever issue has caused the application to fail.
It's also an important part of making sure that the pod restarts on another node, if necessary.

### Ensure you have regular backups taken of your database(s). 

If data recovery is necessary, having access to regularly updated off-site data is key to that process.
You'll also want to  script the recovery of those databases regularly. 
Scripting your data recovery can often mean the difference between bringing your application back up in 5 minutes or 5 hours.

### Follow implementation-as-code best practices. 

The deployment scripts should be kept up-to-date in your Github repo. 
If you need to recover by rebuilding from Github, keeping these scripts up-to-date means that you can have your application up and running again nearly at the push of a button, instead of having to fiddle with settings.

## Community Support

You may note that this document is pretty vague about the "hows" of these principles. This is because it can vary from application to application, and technology stack to technology stack.
The design needs for a highly available chat application are very different from those of a highly available static website. 

This is where the community comes in - if you have a highly available application, please feel free to fork this document and add links to examples from your application (along with information about your stack and any explanations you feel might be necessary).
The more you reach out to help your fellow developer, the stronger a community we will be!
