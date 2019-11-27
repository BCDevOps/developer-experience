#!/usr/bin/env sh
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

cd $DIR
curl -sSL 'https://raw.githubusercontent.com/bcdevops/pipeline-cli/master/cli.sh' | bash -s "$@"
