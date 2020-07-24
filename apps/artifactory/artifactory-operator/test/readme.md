# test notes

## Testing artifactorySA

modify `test-vars-artifactorySA.yml` to update with appropriate service account info, as well as artifactory connection information.

running from one directory up as per the following should generate an appropriate cr for the test.

``` bash
ansible-playbook artserviceacct-main.yml
```

get the generated sa_name from the created artifactorySA object (`oc get artifactorysa {name}` and look for the sa_name value)

run again and pass the generated name to the script:

``` bash
ansible-playbook artserviceacct-main.yml -e "sa_name=${GENERATED SA NAME FROM CR OBJECT}"
```
