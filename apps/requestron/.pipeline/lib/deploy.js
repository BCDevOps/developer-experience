'use strict';
const { OpenShiftClientX } = require('pipeline-cli');
const path = require('path');

module.exports = settings => {
  const phases = settings.phases;
  const options = settings.options;
  const phase = options.env;
  const changeId = phases[phase].changeId;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));
  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'));
  var objects = [];

  console.log('processing template...')
  objects = objects.concat(
    oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/dc.yml`, {
      param: {
        NAME: phases[phase].name,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
      },
    }),
  );

  console.log('applying labels...')
  oc.applyRecommendedLabels(
    objects,
    phases[phase].name,
    phase,
    `${changeId}`,
    phases[phase].instance,
  );

  console.log('importing image stream...')
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag);

  console.log('deploying...')
  oc.applyAndDeploy(objects, phases[phase].instance);
};
