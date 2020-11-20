
# Artifact Repositories

Artifactory is an Artifact Repository system. It serves two primary purposes:

1. It provides caching of artifacts that you would normally pull from a public repository on the internet, allowing faster builds and deployments, as well as more robust security surrounding these public objects.
2. It provides a private space for your team to upload your own artifacts for production purposes.

To start, you will require a service account. Every project set in the cluster is created with one: you will find it in the `tools` namespace, under secrets, with a name of the format `[acct-name]-[namespace-name]-[license-plate]`.
You can also find fuller details about your service account by running the command `oc describe artsvcacct [acct-name]`.

## Using Caching Repositories

The following sections provide some examples for how to pull artifacts through our caching/remote repositories.
You do not need to do anything special to cache the object in Artifactory - pulling the artifact will do this automatically. 
If you are pulling the artifact for the first time, it will take a little extra time in order to cache the object in Artifactory.
After that, pulling the artifact (especially onto a pod on the cluster) should be *much* faster than pulling the image from the internet!

*Note*: These instructions assume that the Artifactory instance is hosted at `https://artifacts.developer.gov.bc.ca/` and a service account with appropriate permissions is already created.

The following curl command can be used to collect an up-to-date list of the caching repos available from Artifactory:

`curl -u username:password -X GET "https://artifacts.developer.gov.bc.ca/artifactory/api/repositories?type=remote" | \
jq -r '(["ARTIFACTORYKEY","SOURCEURL"] | (., map(length*"-"))), (.[] | [.key, .url]) | @tsv' | column -t`

*Hint: use your service account username and password to run this command*

If there is a particular public repository that you would like to see cached through Artifactory, feel free to speak to the Platform Services team about having it added!


### Docker

*Bonus! These steps work perfectly for ANY private docker registry, not just Artifactory!
All you have to do is swap out the artifactory URL for the URL of your preferred registry!*

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
docker pull <REPO_NAME>.artifacts.developer.gov.bc.ca/<IMAGE>:<TAG>
```
*Note*: `REPO_NAME` is unique to each docker repository and must be a part of the URL to pull/push from docker registries hosted in Artifactory.

In order to use these credentials on Openshift, make a secret using the following command:

```bash
oc create secret docker-registry <pull-secret-name> \
    --docker-server=docker-remote.artifacts.developer.gov.bc.ca \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<username>@<namespace>.local
```

and add the secret to the `default` and `builder` Openshift service account, to allow these account to use this pull secret:

```
oc secrets link default <pull_secret_name>
oc secrets link builder <pull_secret_name>
```

*Note that some Openshift documentation implies that linking the secrets in this way is the only necessary step, 
without having to add the pullSecret to your deployment/build configs as below. You are welcome to try this simpler way.
However, we have found that our users run into problems with this method regularly, so we would encourage specifying the
pullSecret in your configurations to avoid any problems*

Now you can add your pull secret to your deployment config, like this...

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

...or to your build config like this:

```yaml
apiVersion: v1
kind: BuildConfig
metadata:
  name: <build-name>
spec:
  strategy:
      dockerStrategy:
        pullSecret:
          name: artifactory-creds
```
*Note that you don't need to use dockerStrategy here - it works the same way under other types of strategy as well*

With these steps completed, you can use this image in your build and/or deployment!

### NPM

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

### Maven

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

### Other Repo Types

There are tons of other repository types available on Artifactory! 
You can browse through them by logging onto artifacts.developer.gov.bc.ca (click the SSO symbol to use either Github or IDIR to log in) and use the UI to see what is available!
We expect these will be very common options for repository types, but if your team uses something else (NuGet, for example), you can find JFrog's complete documentation on the various repo types here:
https://www.jfrog.com/confluence/display/JFROG/Package+Management

If your team uses a specific package type not listed here, we encourage you to create a PR for this document to provide some of your learnings to other teams!


## Using Local Repositories

Private local repos... coming soon!
