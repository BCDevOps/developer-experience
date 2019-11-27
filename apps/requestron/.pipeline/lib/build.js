'use strict';

const { OpenShiftClientX } = require('pipeline-cli');
const path = require('path');

module.exports = () => {
  const oc = new OpenShiftClientX({ namespace: 'devhub-tools' });
  const templateFile = path.resolve(__dirname, '../openshift/bc.yaml');

  const appName = 'requestron';

  const objects = oc.process(oc.toFileUrl(templateFile), {
    param: {
      NAME: appName,
      SUFFIX: `-${oc.options.pr}`,
      VERSION: `build-v${oc.options.pr}`,
      SOURCE_REPOSITORY_URL: `${oc.git.uri}`,
      SOURCE_REPOSITORY_REF: `${oc.git.branch_ref}`,
    },
  });

  oc.applyBestPractices(objects);
  oc.applyRecommendedLabels(objects, appName, 'build', oc.options.pr);
  oc.fetchSecretsAndConfigMaps(objects);
  const applyResult = oc.apply(objects);
  applyResult.narrow('bc').startBuild();
};
