## Disaster Recovery (DR) Planning for RocketChat

"Rocketchat ~~is~~ might be down, what do I do?" - question from Platform Services Team.

### Background
We are exploring new OpenShift Platform on Cloud in Canada region, which gives us the ability to host some of the platform services there. For example, we have been migrating OCP101 training materials as the first pilot. Now we are planning to setup a disaster recovery site for RocketChat as second step and SSO the third. Before starting down the journey, we'd like to ask you, our chat community, on what you could expect. And more importantly, to learn from the community on best practices and experiences!

### Current RocketChat DR Site Ideas:

**Plan A: A maintenance instance:**

pros:
- quick and easy to spin up, with no dependency on other application or systems
- starts with clean chats focusing on communicating the maintenance/troubleshooting progress

cons:
- user cannot continue on previous conversations until production RocketChat is brought back up again
- incoming and outgoing webhooks temporarily unavailable

**Plan B: A fully migrated production instance:**

pros:
- still have access to all previous conversation temporarily
- no need to login again

cons:
- time consuming to migrate all production data
- still experience temporary service downtime during migration as to prevent data corruption

**Blockers:**
- migrate RocketChat service from pathfinder to developer
- test out cloud cluster storage difference and effects


### Your thoughts!
Let us know if you have new ideas, recommendations or concerns!
