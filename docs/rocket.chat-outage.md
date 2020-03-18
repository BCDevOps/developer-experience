# Background:
Mongodb hitting CPU and memory limit recently for several times. In the mongodb pods seeing a lot of db commands, which might be caused by the RC upgrade schema change.

## Actions taken:

scaled down RC app
froze replicas, stepped down primary, stopped db sever
pods got up again, reelected primary
race condition happened, mongodb try to add the same pod twice
remove replica
still having the same long running queries
found out pvc class to be gluster-file instead of gluster-file-db
bring two more replicas with netapp-block-standard
failover to one of the new one by configuring priority
performance improved, but long running query still exists
good enough to bring RC back
app was up but slow

## Take aways:

pvc storage class matters, use block for mongodb
the assumption of devhub query killing mongodb is incorrect

- Identify method to test/validate data corruption or cleanliness.
- Corrupted Indexes?
- corrupted data?
- how to clean?
- restore database to alternative mongo db to see if we can replicate the issue.

need better communication/notification backup

## Outage Response Guides

- build list of primary steps for outage situations

## Testing

- dump a backup of prod onto test.
- test to see if we can reproduce the issue.
  - how do you create load on a rocketchat app?
- once we are able to reproduce the issue, test the following (in order) until the issue is resolved:
    - rebuild all indexes to see if that reduces/eliminates long-running queries.
    - seek out corrupted data and, based on what's found, develop a plan to get rid of it.
    - fix the permissions problem that keeps cropping up.
    - find source of the queries (assuming it's not rocketchat itself)
    - determine if there are malformed api queries coming in.
