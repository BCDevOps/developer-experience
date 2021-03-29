# Migration from Subdomain to Path

## Does it Work for Us?

Moving to the path method places additional load on the pod, so load testing is necessary to make sure the pods can handle the the additional load.

### Load Testing Plan

Using K6, compare the results of pulling a few different images through the caching repos. 

- 50 virtual users pulling repeatedly for 5 minutes
- this was repeated a couple of different times for several different images

You can find the script used in artifactory/loadtest

### Results

The results for the users appear nearly identical. The average duration of a pull for the subdomain method and the average duration of a pull for the path method are consistently within 1 second of each other, often considerably less. The longest duration of a single pull during the test can vary widely, however - the path method takes consistently longer than the subdomain method does. This may indicate that the first attempt to pull (where Artifactory must cache the image from an external site) takes considerably longer, while pulls after that take about the same amount of time.

There is a consistently higher load on the primary pod for the path method; about 115% of the equivalent load for the subdomain method.
A 15% load increase is probably an acceptable price for the benefits to both the team's development time and the user experience, and can be potentially offset by the use of additional instances, if necessary.

It is additionally worth noting that the path method consistently produced a very small number of errors, which the subdomain method did not - around 4 errors for every 1600 pulls (or 0.25%).

## Migrating the Service

- changing the status is simply a matter of one API call to change the config.
- we can leave the existing routes in place just in case we need to roll back.

## Migrating the Operator

- currently, the operator creates a pull secret that covers the appropriate subdomain.
- instead, we should update the operator so that any SA ends up with a pull secret because now we don't need to specify which repo.
- otherwise, we must also update the pull secret definition itself to remove the subdomain.
- this change should be implemented in prod before the service is migrated. It won't break anything because nobody uses the operator-controlled pull secrets yet.

## Migrating Users

- currently, most users will have manually created pull secrets, which will point at subdomains that will no longer exist.
- annoyingly, we can't have any overlap - the path method won't work until we turn off subdomain.
- message with plenty of notice explaining the change and indicating that there will unavoidably be a period in which they cannot pull through Artifactory.
    - you can switch to path shortly before the change is scheduled to take place - you will be unable to pull your image during that short window, but this gives you control over when/how this window occurs.
    - you can switch over to using DockerHub temporarily during the window (but you will be vulnerable to the pull limit issue).
    - a temporary service account that hits the klab artifactory instance will be available for any teams that wish to test the new method for 1 week before the change goes into production.
