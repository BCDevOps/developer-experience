## 0. Prerequisites for Installation

### a. Your local vars.yaml file

You will need a local version of the `vars.yaml` file for recording the cluster-specific config for your installation.

1. Copy `vars.yaml` and paste it into the same folder with the name `vars-local.yaml`.
   * Note that it MUST BE a dash, not an underscore. This name is both already baked into the installation, and it's already present in the .gitignore file, so you need not worry about accidentally uploading it to github.
2. Find the `master_key` and `join_key` variables in the artifactory settings section. Generate new ones by running `openssl rand -hex 32` twice.
   * If you're just testing a quick install, you can leave them alone, but each long-term installation should have their own master and join keys.
   * These are not secrets, and you don't need to worry about hiding them.
3. The file is commented with explanations of what each variable represents. Go through and change your installation config as required.
   * Note that there are a few entries currently prefilled with "xxxxxxxxx" - these are secrets or passwords that you will need to fill later.


### b. Making a New S3 bucket

Generally speaking, a new installation of Artifactory should have its own S3 bucket.

Otherwise, follow these instructions to create a new one:

* Make sure you are connected to the government network, either by logging onto BCNGN or connecting with the VPN.
* Go to https://mgmt.objectstore.gov.bc.ca and log in (your username is your gov email address and your password is your IDIR password).
   * If you don't have access and think you should, speak to another member of the Platform Services team.
* You will likely open the dashboard with a banner indicating a 500 error or a permissions error. This error is expected and can be safely ignored.
* On the menu, click on `Identity and Access`
* Make sure that you are on the "Users" tab near the top of the screen
* Select the `citz-dev-exchange` namespace from the dropdown - this should cause the "New User" button to become functional, and cause several other users to appear in the table below.
* Click on "Add User"
* Give your new object user a name - the name should be formatted like `artifactory-cluster-s3` where cluster is the name of the cluster on which you plan to install artifactory.
* Click "Next" to go to the "Permissions" page.
* Click "ATTACH POLICIES" and select "ECSS3FullAccess"
* Click "Next" to go to the "Tags" page, which you can ignore, so click "Next" again to go to "Review"
* Check that everything looks right, and click "Create User"
* You will be taken to a page where you are given the account's "Access Key ID" and "Access Secret Key" - you can download the csv (which contains both) for future reference.
* Now you can disconnect from the VPN if you want to :)
* Create or update your ~/.s3curl file with your new access keys (see below for instructions). Give it a sensible profile name, like the cluster name.
* Issue this command in your terminal: `./s3curl.pl --id=profile_name --createBucket -- https://citz-dev-exchange.objectstore.gov.bc.ca/bucket_name`
   * use a bucket name of the format `artifactory-cluster` if possible.
* Your new bucket is ready! Copy down the appropriate information into your `vars-local.yaml` file in the Object Store section.

Here is an example of what you .s3curl file should look like:

```
%awsSecretAccessKeys = (
    profile1 => {
        id => 'ID1GOESHERE',
        key => 'KEY1GOESHERE',
    },
   profile2 => {
        id => 'ID2GOESHERE',
        key => 'KEY2GOESHERE',
    },
);
push @endpoints , (
    'citz-dev-exchange.objectstore.gov.bc.ca',
);
```

### c. Making a new SSO Client

Any separate installation of Artifactory currently requires its own SSO client on Keycloak. 

* Log into the SSO admin console and go to the devhub realm.
* On the menu, under `Configure`, click on `Clients`.
* On the top-right corner of the table listing the existing clients, click "Create"
* Give your new client a `Client ID` with the format `oauth-artifactory-cluster` where cluster is the name of the cluster on which you plan to install artifactory.
* Make sure `Client Protocol` says `openid-connect`.
* The `Root URL` is the URL that your new installation will use. 
   * The format should be like `https://artifacts.apps.klab.devops.gov.bc.ca/artifactory` - you need to include the `https` and the `/artifactory` at the end.
   * Your `vars-local.yaml` file has a pretty broad selection of possible URLs that the various clusters might use. It isn't a complete list, but it's a good starting point.
* Click Save, and you'll find yourself on a page with a broader set of settings to configure for your new client.
* Change `Access Type` to `confidential`. 
* Change `Implicit Flow Enabled` to on.
* Copy the `Admin URL` into the `Base URL` box.
* Change `Web Origins` to `*`.
* Click "Save" - now, back at the top of the page, a few new tabs should have appeared.
* Click on the "Credentials" tab.
* `Client Authenticator` should say `Client Id and Secret`. If it doesn't, change that. 
* Copy the `Secret` and paste both it and the client ID into your `vars-local.yaml` file into the appropriate variables under the Keycloak section.

### d. Artifactory Licenses

* Somewhere not in this git folder, create a folder where you plan to keep the secrets. You can use `~/artifactory-secrets` or something else.
* In that folder, you will need to create a new file (or set of files) with license keys for your new Artifactory installation.
   * 1 license key is required per node in your installation, so keep that in mind.
* Once you have created the file, edit your `vars-local.yaml` file to put the filename and folder into the `folder` and `artifactory_license_filename` variables.

The license file must be formatted like this:

```json
[
    {
        "licenseKey": "tL9r2Y...lDBiktbbt"
    },
    {
        "licenseKey": "DiYgVA...P7nvyNI7q"
    }
]
```

The licenseKeys must be on a single line. Any line breaks should be represented by a `\n` character. Many IDEs will allow you to find/replace the linebreak, making conversion much easier.

### d. Artifactory Certificates

In addition, you must also add two sets of SSL certificates to the artifactory-secrets folder:
* artifactory/ca.crt
* artifactory/tls.crt
* artifactory/key.crt
* wildcard/ca.crt
* wildcard/tls.crt
* wildcard/key.crt

Those in the artifactory folder are for artifacts.developer.gov.bc.ca.
Those in the wildcard folder are for *.artifacts.developer.gov.bc.ca (for docker subdomains).

## 1. Installing Artifactory 7

1. Login to the correct openshift cluster.
2. Navigate to the correct project.
3. Run `ansible-playbook install.yaml`.

## 2. Deleting Everything

Don't run unless you're sure ;)

```
oc -n devops-artifactory delete statefulsets,services,routes,poddisruptionbudget,configmaps,pvc -l app=artifactory-ha
oc -n devops-artifactory delete secrets -l app=artifactory-ha
oc -n devops-artifactory delete statefulsets,services,routes,secrets -l app=patroni-001
oc -n devops-artifactory delete configmaps -l cluster-name=patroni-001
oc -n devops-artifactory delete pvc -l app=patroni-001
```

## 3. Generating a New Template

```bash
cd helm
helm template artifactory-ha jfrog/artifactory-ha -f helm-vars-klab.yaml > manifest.yaml
```

Everything should work!
