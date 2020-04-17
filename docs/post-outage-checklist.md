---
title: Post-Outage Application Health Checklist
resourceType: Documentation
personas: 
  - Developer
tags:
  - openshift
  - devops
  - outage
  - recovery
description: In the event of a problem with the platform, follow this checklist to ensure that your application recovers correctly.
---

# Post-Outage Application Checklist

In a perfect world, there would never be outages. One of the benefits of the Openshift platform is a greatly reduced chance of significant unexpected outages and the near-elimination of scheduled outages.
The platform is adaptable and recoverable in a way that legacy architecture is not, and this allows the platform to recover from hardware issues invisibly in many cases.
Still, there is always the possibility that something will affect the platform as a whole and will bring down the applications hosted there. 
In those cases, speedy recovery becomes the order of the day. To that end, here's a checklist of what you should do to ensure your application recovers quickly and effectively in this situation.

> ***NOTE***: This a living document. Any team that has any additional tips for how to build a resilient application and/or how to recover an application can and **should fork this doc and make updates!**

## During the Outage

The application is down! What now?

Well, if it's a platform-wide issue, chances are the Platform Team already knows - check out the `#devops-alerts`, `#devops-sos` and `#devops-operations` channels to see what's already been said on the matter.
If you can't access rocketchat, try our off-site [status page](https://status.developer.gov.bc.ca).
We'll keep the community informed about the status of the outage. There isn't much for our teams to do while the outage is in progress.
Just keep an eye on the status and be ready to jump into action when the outage is over!

## Outage Recovery

Once the platform is back up, the benefit of having such a resilient application (see our Resiliency Checklist for details!) is that there's a high chance everything will quickly recover on its own.
However, there are a few things that should be additionally checked to make sure everything is working as expected once the outage is over.

### Pods

You can generally expect that your pods will all scale back up on their own, once the outage is over. However, it's still a good idea to ensure that this has occurred as expected.
If it hasn't, this may indicate a problem with your deployment-config or with your health checks.
If you're having problems connecting to your application and your pods look healthy, restarting them is a good first place to start.
If that works, that indicates that you may need to build a more complex and robust health check for the pods in question.

### Routes

Routes are static and, thus, it's not very easy to check their status since they don't really come up or go down. 
It is, nonetheless, wise to check that they're working and connecting to your pods after an outage - this is to make sure there are no residual network issues.
If your route exists but cannot connect to a container (even though the container is present and working), deleting the pod and forcing it to recover may help.

### Jenkins

Jenkins is not a part of the core application you're likely to be running, and so often gets missed after an outage. 
It's wise to run a test pipeline through Jenkins to make sure everything works as expected so you don't get caught with a problem pipeline once you start updating your app again.
If you do have problems with your Jenkins installation, delete the slave pods and allow them to restart, then try again.

### RabbitMQ

If you're running rabbitMQ as part of your application, it may require manual intervention to restart in the case of outages that cause network issues. 

## Keeping Track

Chances are that, while helpful, this doc isn't going to be the ideal way for your team to keep up track of the specific things you'll want/need to do in order to ensure effective recovery from an outage.
To that end, we recommend that you create an issue template in github for your application which details all the specific things that you'll need to check to feel secure that your outage is up and running.

Here, you'll find an example of a github template to get you started.
If/when your team finds something new to add to the template, don't forget to generalize it and bring it back her for others to use as well :)

_If you choose to use this template, don't forget to change the name of the template and make sure the assignees are changed to your technical team!_

```

---
name: Application Recovery Checklist
title: 'Application Recovery Checklist [DATE]'
labels: high-priority
assignees: caggles, ShellyXueHan
---

## Deployments
- [ ] Rocketchat pods (minimum 3) are up and communicating with the database.
- [ ] Jenkins pods have been restarted.
- [ ] BCBot has been restarted.

## Stateful Sets
- [ ] MongoDB pods are up, running, communicating with each other and with the application.

## Routes
- [ ] Is Rocketchat Prod available through it's normal route?
- [ ] Fix route to re-point to the production instance if we've swapped over to the maintenace instance during this outage.

## Backups
- [ ] Manually run the recovery test script to make sure that the most recent backup is working.
- [ ] Ensure that next scheduled backup occurs as expected.

```
