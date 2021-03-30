# Migration from Subdomain to Path

## Testing

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

## Migration

1. Check whether any users have made use of the automated pull secret functionality yet. If so, have them manually create an identical temporary pull secret to use instead during the migration period.
2. Let users know about a coming update to the operator - now all service account secrets will have a pull secret, but not to use them yet because they will use the new URL format.
3. Update the operator to use the path method for pull secrets (do we want to roll in the secret deletion update at the same time?)
4. Provide notification to all teams that a breaking change is coming to Artifactory, with all the relevant details and what they need to do to prepare. Include a firm and specific time/date for the cutover.
5. Update Artifactory installation process to reflect the new URL format.
6. Perform cut-over at the specified date and time (either manually or by performing the Artifactory config update via code. I would prefer the latter, but this requires a bit of updating of the Artifactory installation script).
7. Let users know about the success of the change and that they can delete any manually administered pull secrets now.
8. Keep any existing subdomain routes for 2 weeks, in case there are problems that require that we cut back to the subdomain method later. 

## Rollback

1. Inform users of the coming change. Ask them to manually create pull secrets which reflect the subdomain format, if required. Let them know not to delete the operator-controlled pull secrets yet, just stop using them. Provide a time/date for the rollback.
2. Perform the rollback.
3. Remove pull secret functionality from the operator. Let users know that they can now safely delete the incorrect pull secrets, and provide an update on the status of updating the operator to use subdomain pull secret functionality again.
4. Update the operator to use subdomain method for pull secrets. Let users know that they can start creating service accounts to use pull secrets again and that they can delete their manually administered pull secrets now.
