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
