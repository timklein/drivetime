# DriveTime

*DriveTime* is a work in progress. The goal is to pull event data from the ~~Eventful API located at http://api.eventful.com~~ StubHub API and use it to identify events that might be fucking with my commute!

## Usage

You will need a free StubHub Application Token available through http://developer.stubhub.com
Load this value into the appropriate place in the *config/configVars.example* file, then rename the file *configVars.json*

Currently, loading the homepage will generate a console log in the terminal with the details of 1 page of today's Denver events from the StubHub API.

## To Do

+ ~~Base project start~~
+ ~~Format page layout~~
+ ~~Integrate Eventful API~~
+ ~~Integrate StubHub API because Eventful API does not provide a full list of large Denver events~~
+ ~~Work out issues with asyncronous execution (intital page load)~~
+ ~~Template events into homepage~~
+ Work out UTC/Local Date issue
+ Find more ways to identify critical events
