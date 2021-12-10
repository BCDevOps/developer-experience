---
title: Project Resource Quotas in BC Gov's PaaS (Openshift 4 Platform)
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
tags:
  - openshift
  - resources
  - resource quotas
  - RAM
  - CPU
  - storage
description: The quota based resource allocation for project sets in Openshift 4 Platform.
---

All new project sets in the OpenShift Container Platform (OCP) 4 Platform provisioned after Dec 14, 2021 will have the following default resource quotas that include a certain amout of CPU, RAM and Storage:

**CPU/RAM/Storage resource quotas (per namespace by defauly on create)**:
  CPU: 0.5 cores as request, 1.5 cores as limit <br/>
  RAM: 2GBs as request, 4GBs as limit<br/>
  60 PVC count , 1Gbs overall storage with 521 MBs for backup storage and 5 snapshot<br/>


**If your app is fount not using all resources within the current quota, you will be approached by the Platform Services Team to discuss the downgrade to a smaller quota size.**

If you find that the new default allocations are insufficient, you can request a quota increase as described in [How to request a resource quota increase for a project on the Openshift 4 Platform](https://developer.gov.bc.ca/Need-more-quota-for-OpenShift-project-set). **Note: A Sysdig dashboard that demonstrates the application's need for the increase in a specific resource type (CPU or RAM or Storage) must be provided to the Platform Services Team before any quota increase requests can be approved.**

In Dec 2021 we have introduced a more flexible quota model which allows allocating different resource quotas to different namespaces in a project set. The new quotas for each resource category are:

## CPU Quotas:

All CPU Requests and Limits are represented in cores (not millicores) and represent the **maximum** for the combined CPU Request or CPU Limit values for all pods within the namespace.

```
cpu-request-0.5-limit-1.5: CPU Request 0.5 core, CPU Limit 1.5 cores
cpu-request-1-limit-2: CPU Request 1 core, CPU Limit 2 cores
cpu-request-2-limit-4: CPU Request 2 cores, CPU Limit 4 cores
cpu-request-4-limit-8: CPU Request 4 cores, CPU Limit 8 cores
cpu-request-8-limit-16: CPU Request 8cores, CPU Limit 16 cores
cpu-request-16-limit-32: CPU Request 16 cores, CPU Limit 32 cores
cpu-request-32-limit-64: CPU Request 32 cores, CPU Limit 64 cores
```

## Memory Quotas:

All Memory Requests and Limits are represented in GiB and represent the **maximum** for the combined RAM Request or RAM Limit values for all pods within the namespace.

```
memory-request-2-limit-4: RAM Request 2 GiB, RAM Limit 4 GiB
memory-request-4-limit-8: RAM Request 4 GiB, RAM Limit 8 GiB
memory-request-8-limit-16: RAM Request 8 GiB, RAM Limit 16 GiB
memory-request-16-limit-32: RAM Request 16 GiB, RAM Limit 32 GiB
memory-request-32-limit-64: RAM Request 32 GiB, RAM Limit 64 GiB
memory-request-64-limit-128: RAM Request 64 GiB, RAM Limit 128 GiB
```

## Storage Quotas:

All Storage sizes are in GiB.

```
storage-1: Overall Storage: 1 GiB, Backup Storage: 0.5 GiB
storage-2 Overall Storage: 2 GiB, Backup Storage: 1 GiB
storage-4 Overall Storage: 4 GiB, Backup Storage: 2 GiB
storage-16 Overall Storage: 16 GiB, Backup Storage: 8 GiB
storage-32 Overall Storage: 32 GiB, Backup Storage: 16 GiB
storage-64 Overall Storage: 64 GiB, Backup Storage: 32 GiB
storage-128 Overall Storage: 128 GiB, Backup Storage: 64 GiB
storage-256 Overall Storage: 256 GiB, Backup Storage: 128 GiB
storage-512 Overall Storage: 512 GiB, Backup Storage: 256 GiB
```
**All Storage Quotas include 60 PVCs**.
