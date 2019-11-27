'use strict';

const { OpenShiftClientX } = require('pipeline-cli');
const path = require('path');

module.exports = () => {
  const oc = new OpenShiftClientX();
  oc.globalArgs.namespace = `devhub-${oc.options.env}`;
  const templateFile = path.resolve(__dirname, '../openshift/dc.yaml');
  const appName = 'requestron';
  const buildNamespace = 'devhub-tools';
  const buildVersion = `build-v${oc.options.pr}`;
  const deploymentVersion = `${oc.options.env}-1.0.0`;
  // remove pr in prefix for test and prod environemnt:
  const projectPrefix =
    oc.options.env === 'dev' ? `-${oc.options.env}-${oc.options.pr}` : `-${oc.options.env}`;

  // set the rest of the env vars:
  const extraParams = {
    RM_HOST_VALUE: 'https://repo-mountie-devhub-prod.pathfinder.gov.bc.ca/bot/github/membership',
    API_URL_VALUE: `https://${appName}${projectPrefix}-devhub-${
      oc.options.env
    }.pathfinder.gov.bc.ca`,
  };

  const objects = oc.process(oc.toFileUrl(templateFile), {
    param: {
      ...{
        NAME: appName,
        SUFFIX: projectPrefix,
        VERSION: `${deploymentVersion}`,
      },
      ...extraParams,
    },
  });

  oc.applyBestPractices(objects);
  oc.applyRecommendedLabels(objects, appName, oc.options.env, oc.options.pr);
  oc.fetchSecretsAndConfigMaps(objects);
  oc.importImageStreams(objects, deploymentVersion, buildNamespace, buildVersion);
  oc.applyAndDeploy(objects, `${appName}${projectPrefix}`);
};
