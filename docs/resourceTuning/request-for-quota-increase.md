---
title: Need more quota for OpenShift project set?
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
tags:
  - openshift
  - resources
  - claims
  - project
  - devops
description: How to determine if I need more quota in OpenShift project set and request for it
---

# I need more quota, or do I?

Is your application failing to scale due to resource limit? Are you seeing OOM pod kill? Is your PVC almost full? Before requesting for more quota to your project set, please double check if the application is fully utilizing the resources and confirm that the usage is expected. Here are some good reading that will help you to determine on the level of resource the application needs:
- [Resource Management Guidelines](https://github.com/BCDevOps/developer-experience/blob/master/docs/ResourceManagementGuidelines.md)
- [Application Resource Tuning](https://github.com/BCDevOps/developer-experience/blob/master/docs/resource-tuning-recommendations.md)

## First thing first: setup resource monitoring with Sysdig Monitor

Begin a monitoring journey with Sysdig, where you can access dashboards showing your application memory, CPU and storage usage. Before connecting with us for the quota increase request, we will ask you to start monitoring and collecting metrics to show your application resource utilization status. Refer to our Sysdig documentation for self-serve onboarding [here](https://developer.gov.bc.ca/OpenShift-User-Guide-to-Creating-and-Using-a-Sysdig-Team-for-Monitoring). It has all you would need to onboard onto Sysdig and make use of the default dashboards that get created automatically. Should you have any trouble with it, please reach out to us on [Rocketchat channel](https://chat.developer.gov.bc.ca/channel/devops-sysdig)!

> A side note: Sysdig is a great and powerful tool for service monitoring and applying SRE practice! Having you to get started using Sysdig is not just for this one time quota request, but with the goal to leverage it for service monitoring and alerting purpose for the long run.


**Now if you are pretty sure that you do need a quota increase, please continue!**

Resource quota increase can be requested by a Product Owner or a Tech Lead of the project on the project edit page in [Openshift 4 Project Registry](https://registry.developer.gov.bc.ca/public-landing) and will **require the approval** by the Platform Service Team before it is processed.  

Teams requiring more resources in any of the 3 resource categories such as CPU/RAM/Storage in any of the 4 namespaces (dev, test, tool or prod), will have to submit a standard quota increase request through the Project Registry.  The upgrade path will only be available in this order: from small -> medium -> large. You cannot skip medium and upgrade from small to large.

Once the quota increase request is approved (see below what information is required before the request can be approved), the namespaces specified will be upgraded to the next quota size. Refer to [OCP 4 resource quota definition](https://developer.gov.bc.ca/Project-Resource-Quotas-in-BC-Gov's-PaaS-(Openshift-4-Platform)) for more details on each level of quota set.

## What does the Platform Services Team need to know?

Before we provide more resources for you, we need to know if you are making good use of the current quota and any expected load increase to your application.

If you are currently running out of quota, we'd like to see some statistics of resource consumption and utilization. If you are getting prepared for an application load increase, we'd like to know the expected increase and how much growth room you still have.

There are three different types of resource on the platform:
1. CPU
2. Memory (aka RAM)
3. Storage

### Step 1:

Some background for the quota increase request, such as:
- what have you tried to reduce the current resource consumption
- what are the use case for the requested quota increase

### Step 2:

Show us some resource monitor of the components you have in the namespaces. We'd like to know what level resource consumption is with your application and how well they are utilizing resources.

Here are some things to note:
- resource monitoring/collection should be in span of at least a week, or long enough to see the pattern
- consider each component in the namespace, whether that is a part of the application or devops tools


**Part 1 - Compute Resource Quota Increase**

If you are requesting for CPU or Memory quota increase, please collect the average from each replica pods and fill in the table. Also present the Sysdig dashboard so we can leverage on more accurate figures to make the decision! See the following as an example:

| Component name | Description (Optional) | # of Replicas (and range if using auto scaler) | Resource Requested | Resource Limit | Average Consumption | Spikes |
|----------------|------------------------|------------------------------------------------|--------------------|----------------|---------------------|--------|
| RocketChat app | platform chat app | 3 (HPA min 3 max 5) | 1 core CPU | 1.5 cores CPU | 1 core | 1.4 cores |


**Part 2 - Storage Quota Increase**

If you are requesting for an increase of a storage quota, list all the PVCs that you have and the components that are mounting the volume, together with the sysdig dashboard that shows the past usage metrics. We'd like to know what they are used for and its utilization. See the following as an example:

| Component name | Description (Optional) | PVC type | PVC size | Storage Utilization |
|----------------|------------------------|----------|----------|---------------------|
| RocketChat DB patroni statefulset | to store persistent data | netapp-file-standard | 5Gi | 80% |

*Note: provide monitoring data or screenshots if needed*


### Step 3:

Conclude what is the current level of resource consumption and compare with the quota. Also explain in details on how much more quota is required, and for what usage.

Here are some things to include:
- current quota in project set
- total CPU/memory/storage used currently
- expected quota increase amount and detailed allocation plan


### Step 4:
Send the above to Platform Services team at PlatformServicesTeam@gov.bc.ca. Someone from the team will follow up with you soon!

When requesting a quota increase from **medium** to **large**, book a 30 min meeting with the Platform Services Team (send the invite to Olena Mitovska, our Platform PO and she will pull in team's operations experts as needed). The Platform Services Team will be looking for an overview of the application design and architecture that clearly demonstrate why more resources are required for its operations.

If you have a need to store a large amount of **unstructured data**, you may want to consider to leverage the [S3 Object Storage Service](https://github.com/BCDevOps/OpenShift4-Migration/issues/59) provided by Enterprise Hosting.

