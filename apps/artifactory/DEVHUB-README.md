---
title: Artifact Repositories (Artifactory)
resourceType: Documentation
personas: 
  - Developer
tags:
  - openshift
  - artifacts
  - repositories
  - images
  - docker
description: How to design your application to have as much uptime as possible.
---

# Artifact Repositories (Artifactory)

Artifactory is an artifact repository system by JFrog. You can find their documentation [here](https://www.jfrog.com/confluence/site/documentation).

## What Can I Do With Artifactory?

There are three major features bundled with Artifactory:
1. Caching repositories - these allow you to pull publicly accessible images through Artifactory instead of directly from the internet! The benefits include:
    - Your builds and deployments will be faster, because you're getting your images and packages from the local cluster instead of downloading them!
    - You will use less network bandwidth. Thanks for being such a good cluster citizen and caring for shared resources like bandwidth!
    - You can avoid pull limits, like the one on DockerHub! No more `toomanyrequests: You have reached your pull rate limit.` errors!
    - You can share access to private repositories, like the RedHat repositories, without having to pay for additional accounts!
1. Private repositories - a private place to push your own artifacts and images, with your own control over access!
    - coming soon!
1. Xray artifact scanning - this tool scans all artifacts for security issues, giving you a heads up about concerns and providing an opportunity to deal with issues before they become a problem!
    - coming soon!
    
## How Do I Get Started?

Access to Artifactory is controlled through Artifactory Service Accounts. These are accounts that are intended to be shared by teams and used by automation tools like pipelines.

You won't need to do anything in the Artifactory application itself in order to get an Artifactory Service Account, because we have a helpful little robot that does that for you! Meet [Archeobot](bcgov/platform-services-archeobot) - a custom operator that we use to give our amazing teams the freedom to manage their own Artifactory resources!

For now, you'll want to get started by getting your hands on an Artifactory Service Account, which you can then use to pull images and packages through Artifactory!

## How Do I Get An Artifactory Service Account?

Good news, you already have one! Or, you do if you have a project set somewhere on our Openshift 4 clusters!

Check your `tools` namespace, where you should find the following objects:
1. An ArtifactoryServiceAccount called `default`
2. A secret called `artifacts-default-[random]` containing:
    - a username for the Artifactory Service Account (probably something like `default-[namespace-plate]-[random]`)
    - a password for the Artifactory Service Account

There is a random license plate assigned to the end of each object name, in order to ensure uniqueness. You can collect this information by running `oc describe artsvcacct default`. This will also provide some information about reconciliation status, as well as other details about the account! If you're looking for support with the Artifactory Service Account object, including the spec and status information in your ticket is extremely useful!

**Tip! There's a short-name in Openshift for ArtifactoryServiceAccount objects so you don't have to type out such a long object type every time! You can use `ArtSvcAcct` instead!**

You can get the username and password out of the secret using the CLI, like this:
```bash
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```

### Can We Have More Than One Artifactory Service Account?

Absolutely! You can make your own, however you like. The default one in your tools namespace is there to get you started, but you're welcome to make more to suit your needs. You can make as many as you like, in as many namespaces as you like (though we ask that you not go too crazy, as our friend Archeobot needs to be able to keep up with all of them)!

You can make one by running this command:

`oc process -f https://raw.githubusercontent.com/BCDevOps/developer-experience/master/apps/artifactory/artifactory-operator/config/samples/tmpl-artifactory-sa.yaml -p NAME="[ASAname]" -p DESCRIPTOR="[Description of Service Account]" | oc create -f -`

The 'ASAname' will be the name of the the ArtifactoryServiceAccount object - like 'default' above, for the one that is made for you in your tools namespace. It is _not_ the name of the actual account. We recommend using a name that describes the way the account will be used. 

Once Archeobot has reconciled your changes, you'll be able to use this account to access Artifactory as you like. You can use all the same commands outlined in the last section - just change `default` to whatever you've named your new ArtSvcAcct object!

For example, if you're making an account specifically for use in your Jenkins pipeline, you might want to use the name 'jenkins' for the Artifactory Service Account object. This will result in a secret called `artifacts-jenkins-[random]` and an account name called `jenkins-[namespace]-[random]`. You don't need to worry about name collisions with other teams - your account name has your namespace plate in it (the six alphanumeric characters that go before the `-tools`, `-dev`, `-test` or `-prod` in the namespace name), so even if there's another team who called their ArtifactoryServiceAccount 'jenkins', they'll still end up with a different name!

### How Do I Delete an Artifactory Service Account?

If you want to delete your service account for some reason, you can do so by deleting the ArtifactoryServiceAccount object through the Openshift CLI, like this:
`oc delete ArtifactoryServiceAccount [ASAname]` or `oc delete artsvcacct [ASAname]`. 

Archeobot will notice that you've done this and will clean up all the relevant bits - including any secrets it generated for you, so be careful!

If you try to delete the default one in your tools namespace, it will delete - but a new one (also called `default`) will be recreated, likely within about 5 minutes.

### I Deleted my Artifactory Service Account Secret(s)! What Do I Do Now?!

If you have deleted the secret for the default service account that is automatically created alongside your project set, 
you just delete the ArtifactoryServiceAccount object called `default`, which you will find in your `tools` namespace, like so:

`oc delete ArtifactoryServiceAccount default`

Archeobot will detect that this object has been deleted and will remove the service account from Artifactory itself. 

Then, the project provisioner will detect the missing ArtifactoryServiceAccount object and will create a new one in your tools namespace, also called `default`. This will likely happen within about 5 minutes. Once that happens, Archeobot will detect this 'new' object and create a new service account for you in Artifactory. The username will be different from before - the random string at the end will change to reflect that this is, technically, a new account with a new password and new privileges. 

If you've accidentally deleted the secret(s) for a different Artifactory Service Account (one you created yourself, not the default on in your tools namespace), you follow the same process. The only difference is that the project provisioner will not recreate the object for you. You'll need to do that yourself. Delete the object, wait a few minutes for Archeobot to clean everything up, and then create a new ArtifactoryServiceAccount object. You can use the same ASA name if you'd like - but remember the actual username for the account will be different, because it will have a different random string at the end.


## How Do I Use An Artifactory Service Account?

You can use your Artifactory Service Account to pull public images through Artifactory instead of over the internet. This is faster for you, helps to ease bandwidth pressure on the cluster, and allows us to implement additional security scanning! Win-win-win, with just a little extra setup!

*Note*: These instructions assume that the Artifactory instance is hosted at `https://artifacts.developer.gov.bc.ca/` and a service account with appropriate permissions is already created. All accounts are automatically granted the necessary permissions to access the public caching repos in Artifactory.

### How Do I Find Out What Repos Are Available?

The following curl command can be used to collect an up-to-date list of the caching repos available from Artifactory:

`curl -u username:password -X GET "https://artifacts.developer.gov.bc.ca/artifactory/api/repositories?type=remote" | \
jq -r '(["ARTIFACTORYKEY","SOURCEURL"] | (., map(length*"-"))), (.[] | [.key, .url]) | @tsv' | column -t`

*Hint: use your service account username and password to run this command*

If there is a particular public repository that you would like to see cached through Artifactory, feel free to speak to the Platform Services team about having it added!


### Docker

Note that these steps apply to all docker-type repositories, not just DockerHub!

*Bonus! These steps work perfectly for ANY private docker registry, not just Artifactory!
All you have to do is swap out the artifactory URL for the URL of your preferred registry!*

#### Testing Your Account and Pulling Locally

On your command line, login to the registry like so:

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> artifacts.developer.gov.bc.ca/<REPO_NAME>
```

Example of our DockerHub caching repo looks like this:

```bash
docker login -u <USER_NAME> -p <USER_PASSWORD> artifacts.developer.gov.bc.ca/docker-remote
```

Pull from the registry from your local machine. Use this step for local development, and to test your account credentials.

```bash
docker pull artifacts.developer.gov.bc.ca/<REPO_NAME>/<IMAGE>:<TAG>
```
*Note*: `REPO_NAME` is unique to each docker repository and must be a part of the URL to pull/push from docker registries hosted in Artifactory.


#### Pulling from Artifactory in Openshift

In order to pull from Artifactory in Openshift, you'll need:
- a pull secret in the correct namespace
- a reference to that pull secret in your build/deployment config
- a reference to the artifactory URL wherever you reference your image

You can make your pull secret like this:

```bash
oc create secret docker-registry <pull-secret-name> \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<username>@<namespace>.local
```

Make sure you get the **correct** username and password from the `artifacts-[ASAname]-[random]` secret!

Now, add the secret to the `default` and `builder` Openshift service account, to allow these account to use this pull secret:

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
    image: artifacts.developer.gov.bc.ca/<repo-name>/<image>:<tag>
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
        from:
          kind: DockerImage
          name: artifacts.developer.gov.bc.ca/<repo-name>/<image>:<tag>
```
*Notes*:
 - you don't need to use dockerStrategy here - it works the same way under other types of strategy as well
 - don't forget that you need to update the image url to point explicitly at Artifactory. If there's no URL, it will default to DockerHub.

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

Once you're ready to build and deploy on Openshift, you'll need to add the following lines to your assemble file:

```
npm config set registry https://artifacts.developer.gov.bc.ca/artifactory/api/npm/npm-remote/
curl -u $AF_USERID:$AF_PASSWD https://artifacts.developer.gov.bc.ca/artifactory/api/npm/auth >> ~/.npmrc
```

Check out the [repo-mountie assemble file](https://github.com/bcgov/repomountie/blob/master/.s2i/bin/assemble) for an example!

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
