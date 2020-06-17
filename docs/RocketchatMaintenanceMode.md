Recently, Shelly and Cailey have turned our Rocketchat test instance into something we called “Rocketchat Maintenance Mode.” 
When there is an outage in our production instance of Rocketchat, one of our first steps will be to cut over to this Rocketchat Maintenance Mode 
in order to provide further communication, when possible. We’ll do this whenever there’s a scheduled maintenance outage, 
and we’ll do this whenever possible if there is an unscheduled outage.

You may notice that this instance of rocketchat is our test instance, at chat-test.pathfinder.gov.bc.ca. 
This is expected - please connect to it and take a look at the general chat! You'll see updates from the platform services team about the status of the outage.

In many cases, this should require little to no work from you – 
you will need to re-login the first time you connect to this instance, but otherwise, Rocketchat should reconnect on its own. 
However, it’s clear that this doesn’t always happen, and so we have a small list of things you should try if 
rocketchat does go down and you cannot connect to our maintenance mode instance:
 
1. Refresh Rocketchat. If you’re using a browser, press Shift when you’re refreshing in order to make sure the page refreshes completely. If you’re using the app, click “View -> Refresh Without Cache.”
2. Log out and login again.
3. Reconnect to Rocketchat. Either close your browser tab or close the app, and reopen it to reconnect to the correct instance.
4. If you’re still having problems, open a new browser tab and navigate to chat-test.pathfinder.gov.bc.ca.
 
On this maintenance mode instance, the platform services teams will provide regular updates about the status of 
maintenance or troubleshooting so you have a good idea of when our production instance of rocketchat will be back up. 
This is going to be our primary method of communication, so it’s important that you try to connect here first before 
emailing or skyping people on the platform services team. It also provides an easy channel for open communication 
between our team and all of our development teams to ask questions and provide troubleshooting information.
 
The biggest weakness in this plan is that Rocketchat Maintenance Mode is hosted on the same cluster as production Rocketchat – 
therefore, if we have a platform-wide problem, our Maintenance Mode instance is at risk of going down as well. 
In that case, there are other places you can look for information:
 
- Updated status information on our various services (as well as notifications) are available at https://status.pathfinder.gov.bc.ca/
- Email: when rocketchat is down, you can expect communications sent out to product owners. Please communicate directly with your product owner first to get information in this case – we’ll send out updates to teams as often as possible.
 
We’re working on moving Rocketchat into a context where issues with the platform won’t affect rocketchat, 
but that’s a medium or long term plan at the moment – in the meantime, this will be our process.
 
As always, if you have questions about this process, you’re welcome to ask about/discuss this on the #devops-how-to!
