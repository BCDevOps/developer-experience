#!/bin/bash

# Reference:
# https://docs.documize.com/s/WtXNJ7dMOwABe2UK/api

set -e
if [ "$1" == "" ]; then
    echo "Error: Missing Arguments"
    echo ''
    echo "Usage:"
    echo "$0 test|dev|prod"
    echo ''
    exit 1
fi

source "setenv-$1.sh"

# To get an brief idea of the existing users/groups/spaces on Documize:
mkdir output/

# get users:
curl -H "Authorization: Bearer $TOKEN" -H 'Cache-Control: no-cache' -X GET "$URL/api/users?limit=5000" > output/users.json

# get groups:
curl -H "Authorization: Bearer $TOKEN" -H 'Cache-Control: no-cache' -X GET "$URL/api/group" > output/groups.json

# get spaces:
curl -H "Authorization: Bearer $TOKEN" -H 'Cache-Control: no-cache' -X GET "$URL/api/space" > output/spaces.json

# filter by the roles:
jq -r '.[] | select(.admin == true or .editor == true) | [.id, .firstname, .lastname]' output/users.json > output/adminUsers.json


# count users:
echo '------number of users:------'
jq length output/users.json
