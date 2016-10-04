# DriveTime

*DriveTime* is a work in progress. The goal is to pull event data from the ~~Eventful API located at http://api.eventful.com~~ StubHub API.

## Usage

You will need a free Eventful API key and a StubHub Application Token. Load these values into the appropriate place in the *config/configVars.example* file, then rename the file *configVars.json*

Currently, loading the homepage will generate a console log in the terminal with the details of today's Denver events from the Eventful API and the event titles for page 1 of the results.

Load the /tst path will generate a console log in the terminal with the details of 1 page of today's Denver events from the StubHub API.

## To Do

+ ~~Base project start~~
+ ~~Format page layout~~
+ ~~Integrate Eventful API~~
+ ~~Integrate StubHub API because Eventful API does not provide a full list of large Denver events~~
+ Find a way to identify critical events
+ Integrate events into page