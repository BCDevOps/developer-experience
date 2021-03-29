# Migration from Subdomain to Path

## Does it work for us?

We will need to perform a load test once we move to the path method because using path may cause additional load on the artifactory pods. Plan to come.

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
