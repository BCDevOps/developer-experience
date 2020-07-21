---
title: Cronjob Management
resourceType: Documentation
personas: 
  - Developer
tags:
  - openshift
  - ha
  - maintenance
  - cronjobs
  - devops
description: Running cronjobs in a community-minded way.
---

# Cronjob Management

Cronjobs are a common and useful tool on Openshift, just as they are on any legacy platform. 
There are, however, a few key things to note about how cronjobs work in a containerized platform that development teams should consider when running cronjobs.

## How Openshift Cronjobs Work

A cronjob is scheduled on Openshift in almost exactly the same way as it would be on a normal server, using the same `* * * * *` format.
However, instead of spinning up a file to be run on the given schedule, a cronjob on Openshift spins up a new pod to perform the task in question.
This has its pros and cons. 

The benefit is likely rather obvious: you don't have a pod running, taking up resources, unless the cronjob is actually running.
Once the scheduled moment hits, the system spins up a pod, performs the task, and then shuts right back down again, leaving your quota free for you to use in other ways.

The drawback, however, is that you're required to spin up a pod every time you want to run the job, which creates a little overhead on each job.
Now, this isn't a concern if you're only running the job twice a day. 
However, if you have more stars in your schedule than anything else, you may run into an issue where you have a new pod spinning up every single minute.
This is no longer an acceptable amount of overhead, and may even interfere with the correct running of the job itself as well as placing unnecessary strain on the platform as a whole.

## How Can I Find Out If My CronJobs Run Too Often?

We don't have a handy rule-of-thumb to decide how often is too often - while it would be nice to say "any job that runs more often than once every 15 minutes," the reality is that it depends on the nature of the job.
If you have a job that runs every 15 minutes but takes 10 seconds to run, spinning up a new pod every time might be worthwhile, since that's one less pod on the platform for 14 and a half minutes.
On the other hand, if your job takes 12 minutes to run, it might no longer be worthwhile to spend the overhead shutting the pod down for only 3 minutes in each window.

There is a reason why teams on this platform are given so much freedom to make their own decisions - we trust you to be educated on best practices, to be community-minded, and to understand your application better than we ever could.
**Use your own best judgement when deciding if your cronjob runs too often.**

To check and see what cronjobs you have on your project that run very often, try this command:

`oc get cronjob | grep -E '\* \* \* \* \*|\*/1' | grep -v True`

This version of the command will only pull up those cronjobs running once per minute - if you want to find cronjobs with other schedules, just adjust the grep filter accordingly.

## What Do I Do If I Have A Cronjob That Runs Often?

The first and most obvious question is whether it *needs* to run that often. If not, that's a very easy fix!

But often, there is a very good reason why a cronjob would need to run so regularly. We are absolutely not asking that you reduce the regularity of such jobs, especially not if it would negatively impact your application in some way.
In this situation, the correct solution is to put your cronjon into a **persistent pod**. 
This just means that, instead of spinning up a new pod every time the platform tries to run your job, it spins up one pod, one time, and that pod stays up, running the job repeatedly.
This eliminates the need for a pod to bounce up and down very often.

