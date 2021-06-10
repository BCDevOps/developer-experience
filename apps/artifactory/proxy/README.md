# TL;DR

This is the deploument manfiest(s) to run the Artifactory proxy needed to allow switchig from

1. `docker-remote.artifacts.developer.gov.bc.ca` -> `artifacts.developer.gov.bc.ca/docker-remote`; and
2. `redhat-docker-remote.artifacts.developer.gov.bc.ca` -> `artifacts.developer.gov.bc.ca/redhat-docker-remote`.

It will allow the existing URLs to continue to work even though artifactory itself has been switched to the new URL format.

## Deployment

The manifest is not overly generic so it takes one one mandatory parameter, the `DOMAIN_NAME`. This is how it can be adapted to run in a lab environnement or production cluster. For the lab, it is recommended to include the optional REPLICAS parameter set to `1`.

```console
oc process -f deploy.yaml -p DOMAIN_NAME=apps.klab.devops.gov.bc.ca | \
oc apply -f -
```

| NAME          | OPTIONAL | DESCRIPTION | 
| :-----------: | :------: | :---------- |
| DOMAIN_NAME   | No       | The base domain name that varies between clusters. |
| REPLICAS      | Yes      | The number of replica pods to be created. |

Once deployed it will create two routes:

1. https://docker-remote.apps.klab.devops.gov.bc.ca
2. https://redhat-docker-remote.apps.klab.devops.gov.bc.ca

The any HTTP(S) traffic to these routes will be directed to the proxy where the URL will be adapted for the correct destination. For example, any traffic from docker to `docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest` will be redirected to the URL `artifacts.apps.klab.devops.gov.bc.ca/docker-remote/caddy:latest`

### Docker Example

```console
➜  docker pull docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
latest: Pulling from caddy
Digest: sha256:8031d689a8e6f47dcc146121b75946348e8b2e94a183e92cac38a489f55759a2
Status: Image is up to date for docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
```

## Credential Management

The server used for creating credentials should match whatever server is being used by docker (etc). In the example below, the secret:

```console
oc create secret docker-registry artifactory-creds \
--docker-server=docker-remote.apps.klab.devops.gov.bc.ca \
--docker-username=yyyyyyyyyyy \
--docker-password=xxxxxxxxxxx \
--docker-email=unused
```

Must match the server used but the docker command

```console
➜  docker pull docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
latest: Pulling from caddy
Digest: sha256:8031d689a8e6f47dcc146121b75946348e8b2e94a183e92cac38a489f55759a2
Status: Image is up to date for docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
docker-remote.apps.klab.devops.gov.bc.ca/caddy:latest
```

and the `image:` used in a deployment manifest:

```yaml
    spec:
      containers:
        - name: my-busybox
          image: 'docker-remote.apps.klab.devops.gov.bc.ca/busybox:latest'
```

## TODO

The proxy uses the external URL for artifactory. It maybe more effective to use the internal address (service name) for a more direct connection and to reduce both network latency, traffic, and network path complexity.
