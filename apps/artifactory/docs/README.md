
# Artifact Repositories

- Description of on-prem artifact repositories, the why and what.

## Private Repositories

### Requesting

To request creation of a private repository, a request in the devops-requests channel needs to be made of the form:

``` yaml
Artifact Repository Request
Project Shortname: projectSet shortname (example: {shortname}-[tools|dev|test|prod])
Repository Type: [docker|maven|npm| ... ] (full list of supported repsitories TBD)
Repository Locator: [local|virtual]
Repository Description: "Descriptive information about repository"

[virtual only]
Repository List: "comma separated list of existing repositories to merge, must all be of same type"
```

Once your repository has been provisioned, you will be given a service-account and Token that can be used to access your repository.  (better secret distribution TBD)

### Managing additional access for your repository:

To add additional named access to your repository, the user must already exist.  Once you have the username, the following curl command can add that user:

*TBD*

## Using Caching repositories
- Current Authentication model
no anonymous access as we do not lock down remote access to the repository by location, and the tool is meant for cluster use.

this means that in order to effectively use the caching repositories, a service account will be required.  This is currently created with a private repository.

### Pulling Artifacts from caching repositories

Following are some examples of how to pull artifacts from caching repositories:

*Note*: These instructions assume that the Artifactory instance is hosted at `https://artifacts.apps.klab.devops.gov.bc.ca/` and a service account with appropriate permissions (`test-devops-artifactory-gjafwu` in this case) is already assigned.

#### NPM

For this guide, we will use a repository in Artifactory called `npm-remote` which is pointing to the remote npm repository `https://registry.npmjs.org`.

Steps:

Set npm registry

```bash
$ npm config set registry https://artifacts.apps.klab.devops.gov.bc.ca/artifactory/api/npm/npm-remote/

```

Authenticate to the registry

```bash
$ npm login
Username: test-devops-artifactory-gjafwu
Password:

Email: (this IS public) test-devops-artifactory-gjafwu@artifactory.local

Logged in as test-devops-artifactory-gjafwu on https://artifacts.apps.klab.devops.gov.bc.ca/artifactory/api/npm/npm-remote/.
```

Once the authentication is complete, you can now pull artifacts from this registry

```bash
$ npm install inspectpack --registry https://artifacts.apps.klab.devops.gov.bc.ca/artifactory/api/npm/npm-remote/

+ inspectpack@4.5.2
updated 1 package in 3.131s
4 packages are looking for funding
  run `npm fund` for details
```
*Note*: The user that has authenticated to artifactory must have appropriate permissions to pull from the repository, otherwise this command will return with permissions errors, just like the one shown below:

```bash
npm ERR! code E403
npm ERR! 403 403 Forbidden - GET https://artifacts.apps.klab.devops.gov.bc.ca/artifactory/api/npm/npm-remote/inspectpack
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.
```



## Merging Private repositories with caching repositories

to merge multiple repositories into a single virtual repository, you can request a private repository of type "virtual".
