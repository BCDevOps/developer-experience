---
description: BCGov Pathfinder RocketChat OAuth SSO Update
resourceType: Documentation
title: BCGov Pathfinder RocketChat OAuth SSO Update
labels:
- RocketChat
- Oauth
---

## RocketChat OAuth SSO Update
We are updating RocketChat's Oauth integration with BCGov SSO, from `sso.pathfinder.goc.bc.ca` to `oidc.gov.bc.ca` on December 8th, 2020.

This change have been tested in lower environments, there is `NO expected impact` in your current RC usage or the RC login flow. Authentication behavior will just be how it has been and is consistent between browser/desktop/mobile clients. In the case you do need to login again, please make sure you have refreshed cache and completed quit the browser first.

***Please note the following:***
- SiteMinder login flow is still not supported on iOS device. You might encounter an 1200 issue when trying to login. If so, please access RC with a web browser and let us know here: https://chat.pathfinder.gov.bc.ca/channel/rocketchat-help?msg=agmDfCJWwRaTxftBA
- If you experience and issue logging into RocketChat, please contact us at pathfinder@gov.bc.ca.

Thank you!
