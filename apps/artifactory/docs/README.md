
# Artifact Repositories

- Description of on-prem artifact repositories, the why and what.

## Using Caching repositories

To start, you will require a service account. Every project set in the cluster is created with one: you will find it in the `tools` namespace, under secrets, with a name of the format `[acct-name]-[namespace-name]-[license-plate]`.
You can also find fuller details about your service account by running the command `oc describe artsvcacct [acct-name]`.

### Pulling Artifacts from caching repositories

Following are some examples of how to pull artifacts from caching repositories:

*Note*: These instructions assume that the Artifactory instance is hosted at `https://artifacts.developer.gov.bc.ca/` and a service account with appropriate permissions is already created.

#### Docker

Login to the registry

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> <REPO_NAME>.artifacts.developer.gov.bc.ca
```

Example of our DockerHub caching repo looks like this:

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> docker-remote.artifacts.developer.gov.bc.ca
```

Pull from the registry from your local machine. Use this step for local development, and to test your account credentials.

```bash
docker pull artifacts.developer.gov.bc.ca:443/<REPOSITORY_KEY>/<IMAGE>:<TAG>
```
*Note*: `REPOSITORY_KEY` is unique to each docker repository and must be a part of the URL to pull/push from docker registries hosted in Artifactory

In order to use these credentials on Openshift, make a secret using the following command:

```bash
oc create secret docker-registry <pull-secret-name> \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<username>@<namespace>.local
```

Now you can add your pull secret to your deployment config, like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: <pod-name>
spec:
  containers:
  - name: <container-name>
    image: <your-private-image>
  imagePullSecrets:
  - name: <pull-secret-name>
```

#### NPM

For this guide, we will use a repository in Artifactory called `npm-remote` which is pointing to the remote npm repository `https://registry.npmjs.org`.

Steps:

Set npm registry -

```bash
$ npm config set registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
```

Authenticate to the registry

```bash
$ npm login
Username: <username>
Password:
Email: <username>@<namespace>.local
```

Once the authentication is complete, you can now pull artifacts from this registry

```bash
$ npm install inspectpack --registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
+ inspectpack@4.5.2
updated 1 package in 3.131s
4 packages are looking for funding
  run `npm fund` for details
```
*Note*: The user that has authenticated to artifactory must have appropriate permissions to pull from the repository, otherwise this command will return with permissions errors, just like the one shown below:

```bash
npm ERR! code E403
npm ERR! 403 403 Forbidden - GET https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/inspectpack
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.
```

#### Maven

To deploy build artifacts through Artifactory you need to add a deployment element with the URL of a target local repository to which you want to deploy your artifacts. Following is an example snippet

```xml

<distributionManagement>
    <repository>
        <id>central</id>
        <name>artifactory-ha-primary-0-releases</name>
        <url>https://artifacts.developer.gov.bc.ca/artifactory/test-maven-repo</url>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <name>artifactory-ha-primary-0-snapshots</name>
        <url>https://artifacts.developer.gov.bc.ca/artifactory/test-maven-repo</url>
    </snapshotRepository>
</distributionManagement>


```


