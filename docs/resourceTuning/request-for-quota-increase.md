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

**Now if you are pretty sure that you do need a quota increase, please continue!**

## What does the Platform Services Team need to know?

Before we provide more resource for you, we need to know if you are making good use of the current quota and any expected load increase to your application.

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

If you are requesting for CPU or Memory quota increase, please collect the average from each replica pods and fill in the table. See the following as an example:

| Component name | Description (Optional) | # of Replicas (and range if using auto scaler) | Resource Requested | Resource Limit | Average Consumption | Spikes |
|----------------|------------------------|------------------------------------------------|--------------------|----------------|---------------------|--------|
| RocketChat app | platform chat app | 3 (HPA min 3 max 5) | 1 core CPU | 1.5 cores CPU | 1 core | 1.4 cores |


**Part 2 - Storage Quota Increase**

If you are requesting for an increase of storage quota, list all the PVCs that you have and the components that are mounting the volume. We'd like to know what they are used for and its utilization. See the following as an example:

| Component name | Description (Optional) | PVC type | PVC size | Storage Utilization |
|----------------|------------------------|----------|----------|---------------------|
| RocketChat DB patroni statefulset | to store persistent data | netapp-file-standard | 5Gi | 80% |

*Note: provide monitoring data or screenshots if needed*


**Step 3:**

Conclude what is the current level of resource consumption and compare with the quota. Also explain in details on how much more quota is required, and for what usage.

Here are some things to include:
- current quota in project set
- total CPU/memory/storage used currently
- expected quota increase amount and detailed allocation plan


**Step 4:**
Send the above to Platform Services team at pathfinder@gov.bc.ca. Someone from the team will follow up with you soon!
