All project sets in the new OpenShift Container Platform (OCP) 4 Platform are provisioned by default with a "small" resource quota size that includes a certain amout of CPU, RAM and Storage.  The amount of resources within each quota size - small, medium and large are as follows:

**CPU/RAM/Storage resource quotas (per namespace)**:
* **Small (Default)**:<br/> 
  CPU: 4 cores as request, 8 cores as limit <br/>
  RAM: 16GBs as request, 32GBs as limit<br/>
  20 PVC count , 50Gbs overall storage with 25 GBs for backup storage<br/>

* **Medium: (needs to be requested and justified)**:
Long-running workload quotas:<br/>
CPU: 8 cores as request, 16 cores as limit<br/>
RAM: 32GBs as request, 64GBs as limit<br/>
Medium: 40 PVC count , 100Gbs overall storage with 50 GBs for backup storage<br/>

* **Large: (needs to be requested and justified):**
Long-running workload quotas:<br/>
CPU: 16 cores as request, 32 cores as limit<br/>
RAM: 64GBs as request, 128GBs as limit<br/>
Large: 60 PVC count , 200Gbs overall storage with 100 GBs for backup storage 

If you find that the new default allocations are insufficient, you can request a quota increase as described in [How to request a resource quota increase for a project on the Openshift 4 Platform](https://developer.gov.bc.ca/Need-more-quota-for-OpenShift-project-set).
