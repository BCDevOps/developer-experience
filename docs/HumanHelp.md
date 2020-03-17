# Help, I can't find an issue template that gets me what I need! What do I do now?!

The answer to this question depends on what you're trying to do.

## I'm looking for help building my application, deploying to OpenShift, using one of the platform services and/or help with an app on my computer.

We are a community-supported platform - that means you should look to the community! Checking the documentation for the specific application is a good start:
* [Openshift Docs](https://docs.openshift.com/container-platform/3.11/welcome/index.html)
* [Openshift 101 Labs](https://ocp101-labs.pathfinder.gov.bc.ca/)
* [RocketChat Docs](https://rocket.chat/docs/)
* [Keycloak Docs](https://www.keycloak.org/documentation.html)
* [Documize Docs](https://docs.documize.com/s/WOzFU_MXigAB6sIH/user-guides)

Let us know if you think there are any missing from this list! :)

If that doesn't help, your next stop should be `#devops-how-to` on Rocketchat. There are plenty of people in our 2000+ strong community who can offer their expertise!
To find out if there is a current service alert or operational work that might be impacting your application, you can check the following:
- https://status.pathfinder.gov.bc.ca
- #bcdevops-alerts
- #bcdevops-operations
- #bcdevops-sos

Please note: the channels above are not "please help" channels, and are used for communication related to the platform itself (not individual application support).

## I suspect there's an outage or service problem.

As above, check the available platform alerts and operations channels and please feel free to raise a suspected platform issue there.  (The `#devops-sos` is the **Everything is on FIRE** channel, that can be leveraged for emergency assistance.)

Otherwise, go to our [Status Page](https://status.pathfinder.gov.bc.ca/d/homedashboard/bcgov-devhub-status-page) to check on the status of our services. 
Make sure you scroll down to check the Operations Notices - if there's something there about this issue, the Platform Services team is aware and is working on it!

Next, check `#general` and `#devops-alerts` to see if any member of Platform Services has made an announcement about the issue.

If you don't see anything about the team already working on the problem, then feel free to `#devops-how-to` or `#devops-operations` to ask about the issue.

## I know what I want to do, I just don't have the permissions to do it.

There are two possibilities here:

1. You're not supposed to do this thing.
2. You *are* supposed to do this thing, and there should be an appropriate issue template for it, but there isn't one (yet).

Either way, you can submit an issue requesting this new issue type [here](https://github.com/BCDevOps/devops-requests/issues/new?assignees=caggles%2C+ShellyXueHan&labels=new-request-type&template=new_request_type.md&title=).
Once you submit that issue, someone from Platform Services will either create the new issue type or will close the ticket with an explanation of why you're not supposed to do the thing. 
You're always free to chat us up on rocketchat if you want some help finding an alternative in the case that your request isn't permitted!

# Tips on asking for help on RocketChat (and anywhere else!)

A good question is more likely to get an answer - and they're likely to get a better answer more quickly, too!

To that end, you'll want to include plenty of detail. Generally speaking, you should include the following:

1. **What are you trying to do?** Provide plenty of detail about exactly what you're hoping to achieve. What end result are you looking for?
2. **How are you trying to do it?** Provide details about what you've already done to solve your problem and what tools you're using. If you're having problems logging into rocketchat, are you using IDIR or Github? Website or App? On Windows or Mac? Include all the details you can think of!
3. **What kind of help do you want?** What is it that you're hoping the community can provide for you?
4. **Why are you trying to do it?** Why is this important in the first place? Maybe there's another simpler way that can serve your purpose - it's important for the community to know that, too!

Granted, not all of these questions will apply to all problems, but err on the side of including more information if you're not sure. 


