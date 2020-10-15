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
If you are installing for testing purposes, this probably isn't necessary and you can use the "test" bucket.

Otherwise, follow these instructions to create a new one:

* Make sure you are connected to the government network, either by logging onto BCNGN or connecting with the VPN.
* Go to https://mgmt.objectstore.gov.bc.ca and log in (your username is your gov email address and your password is your IDIR password).
   * If you don't have access and think you should, speak to another member of the Platform Services team.
* You will likely open the dashboard with a banner indicating a 500 error or a permissions error. This error is expected and can be safely ignored.
* On the menu, click on `Manage` and then `Users`
* Make sure that the button saying "Object Users" has a grey background near the top of the page. If it doesn't, click on "Object Users"
* Click on "New Object User"
* Give your new object user a name - the name should be formatted like `artifactory-cluster-user` where cluster is the name of the cluster on which you plan to install artifactory.
* Ensure the namespace says `citz-dev-exchange` and click on "Next to Add Password"
* On the next page, under `S3/Atmos` click the "Generate and Add Secret Key" button, then copy down the resulting secret key. 
* Ignore the other sections (`Swift Groups` and `CAS`) and click "Close"
* Ensure the new object user shows up on the list of object users on the User Management page.
* Under `Manage` on the menu, click `Buckets`
* Make sure the dropdown next to "New Bucket" says `citz-dev-exchange` and then click "New Bucket"
* Give your new bucket a name - the name should be formatted like `artifactory-cluster-bucket` where cluster is the name of the cluster on which you plan to install artifactory.
* Ensure the namespace says `citz-dev-exchange` and leave the replication group as the default value.
* Enter the name of the new object user you just made in the Bucket Owner box.
* Make sure that `Set current user as Bucket Owner` is **NOT** selected, and then click "Next"
* On the next page, `Required`, leave everything as default and click "Next"
* On the next page, `Optional`, turn Quota on, set it to `Notification Only at` and provide a reasonable value, depending on the nature of the installation.
* Ignore the other sections (`Bucket Tagging` and `Bucket Retention Period`) and click "Save"
* Your new bucket is ready! Copy down the appropriate information into your `vars-local.yaml` file in the Object Store section.

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

* In the same folder as this file, create a local directory called "licenses". This directory is already in .gitignore
* In that folder, you will need to create a new file (or set of files) with license keys for your new Artifactory installation.
   * 1 license key is required per node in your installation, so keep that in mind.
* Once you have created the file, edit your `vars-local.yaml` file to put the filename into the lookup for the variable `artifactory_licenses` in the Artifactory section.

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

In addition, you must also add two sets of SSL certificates to the licences folder:
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

## 2. Post Installation Steps

There are just a couple of things that I haven't quite figured out how to do through the API yet, but it's coming!

For now, here's what remains

*Changing the Docker Access Method*

* Log into Artifactory using the admin account
* Go to the administration panel and, down at the bottom of the menu, under `Services`, click `Artifactory`
* On the page that comes up, click `HTTP Settings` under `General` (bottom of the first box)
* Switch `Docker Access Method` from `Repository Path` to `Sub Domain`

*Allow Docker Access Tokens*

* Still on the admin panel, click on `Respositories` and then `Respositories` on the dropdown panel (yeah, it's weird that they have the same name twice)
* Near the top of the page, click `Remote`
* Navigate a docker repo and click on the name of the repo
* Check `Enable Token Authentication` and uncheck `Block pulling of image manifest v2 schema 1`
* Repeat for each remote docker repo.

## 3. Deleting Everything

Don't run unless you're sure ;)

```
oc delete statefulsets,services,routes,secrets,poddisruptionbudget,configmaps,pvc -l app=artifactory-ha
oc delete statefulsets,services,routes,secrets -l app=patroni-001
oc delete configmaps -l cluster-name=patroni-001
oc delete pvc -l app=patroni-001
```
