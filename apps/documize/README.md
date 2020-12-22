## Documize Admin Usage

Documize is an open source content authoring & automation system that allows teams to collaborate on internal and external documentation. Platform Services team is supporting the Documize instance for the BC Gov community. Follow the settings provided for new space provisioning and maintenance.


## Documentation
- For new users on how to use Documize: https://docs.documize.com/s/WOzFU_MXigAB6sIH/user-guides
- For Admin users: https://docs.documize.com/s/WNEpptWJ9AABRnha/administration-guides


## Technical Details

### Application
- Documize Community Edition v3.7.0
- Conversion Service version v3.1.0
- Postgres & Patroni version 10
- Authentication with RedHat Keycloak 4.8

### Pre-Requisites
Set up the docker account. In your namespace, run the command 
    ```oc create secret docker-registry <secret-name> --docker-server=docker.io --docker-username=<docker-username> --docker-password=<docker-password> --docker-email=unused```

Then link your secret with the command
    ```oc process -f ./apps/documize/openshift/sa-linked-image-pull-secrets.yml -p NAMESPACE=<namespace> -p SECRET_NAME=<secret-name> | oc apply -f - -n <namespace>```

Now your docker account will be used to pull images from docker.

### Deployment
The application is built and deployed on OpenShift Project Set `hmg6pw-*`. Pipeline is setup with [BCDK](https://github.com/BCDevOps/bcdk).


## Admin Configurations:

### Authentication
Documize has been configured to leverage on RedHat Keycloak and accept GitHub and IDIR identity providers.
See reference [here](https://docs.documize.com/s/WNEpptWJ9AABRnha/administration-guides/d/WNEp8tWJ9AABRnhj/authenticating-with-redhat-keycloak)
For BCGov Documize settings, there are
- a local user in the master realm for the application realm user query (view users permission)
- a dedicated client in the `devhub` realm
- IDIR and GitHub identity providers


### Space Settings:
- space visibility
  - public: all users could see the content from the space
  - protected: only users with permission could see/edit
- space label
  - only one label could be assigned to a space
  - creating new labels is admin only action (the current labels correspond to different ministries)
- clone
  - template from existing spaces
  - permission from existing spaces (helpful for admin management, the new space owner will need to be updated)


### User Groups/Roles:
- admin group: gives access to all spaces
- new users are only assigned with `active`, space manage/owner needs to login which pre-creates the account
- when a new space is requested, admin user creates it and assign the space manage/owner to an existing account
- space manage/owner is responsible to manage any further access for the space
