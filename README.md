# DriveTime

*DriveTime* is a work in progress. The goal is to pull event data from the ~~Eventful API located at http://api.eventful.com~~ StubHub API and use it to identify events that might be fucking with my commute!

## Usage

You will need a free Eventful API key and a StubHub Application Token. Load these values into the appropriate place in the *config/configVars.example* file, then rename the file *configVars.json*

Currently, loading the homepage will generate a console log in the terminal with the details of 1 page of today's Denver events from the StubHub API.

Loading the /tst path will generate a console log in the terminal with the details of today's Denver events from the Eventful API and the event titles for page 1 of the results.

## To Do

+ ~~Base project start~~
+ ~~Format page layout~~
+ ~~Integrate Eventful API~~
+ ~~Integrate StubHub API because Eventful API does not provide a full list of large Denver events~~
+ Work out UTC/Local Date issue
+ Find ways to identify critical events
+ Template events into homepage