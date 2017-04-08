var https = require('https');
var fs = require('fs');
var eventDetails = require('../models/eventDetails.js');

// Load Configuration
var configVars = require('../config/configVars.json');

var apiController = {
	stubhub	:  	function(req,res){
					var options = {
						host: 'api.stubhub.com',
						path: '/search/catalog/events/v3?status=active&city=Denver&sort=eventDateLocal&rows=100',
						headers : { "Authorization": "Bearer " + configVars.stubhubAppToken }
					};

					// Function to render page once today's events are extracted from the API results
					var onComplete = function(){
						res.render('index', { eventDetails : eventDetails });
					};

					https.get(options, function(res){

						var chunks = [];

						res.on('data', function(chunk){

							chunks.push(chunk);

						}).on('end', function(){

							var body = JSON.parse(Buffer.concat(chunks));

							// Array to hold selected events
							eventDetails = [];

							// Venues to include in selection - Currently: Pepsi Center, Sports Authority Field, Boettcher, Convention Center
							var keyVenues = [4205, 4602, 1683, 33370, 7986];

							// Include event ID's of odd listings like "Season Ticket Packages"
							var exclude = [9614457, 9583788];

							for (var i in body.events) {

								var event = body.events[i].name;
								var id = body.events[i].id;
								var venue = body.events[i].venue.name;
								var venueID = body.events[i].venue.id;

								// Event date in local timezone formatted as an ISO string
								var eventDate = body.events[i].eventDateLocal.substr(0,10);
								// Today's date in local timezone formatted as an ISO string
								var today = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

								// Wait until last event is processed before rendering
								if ( i == (body.events.length-1) ) {
									onComplete();
								}

								// Select today's events from key venues and exclude unwanted events
								if (eventDate === today && keyVenues.indexOf(venueID) != -1 && exclude.indexOf(id) === -1 ) {

									eventDetails.push(body.events[i]);
									// console.log('You have the ' + event + ' today at ' + venue + '!');

								}
							}

							// Save results to a file for potential logging
							fs.writeFile('./data/events.json', JSON.stringify(eventDetails), (err) => {
								if (err) throw err;
								// console.log('Saved');
							});

						});

					});

				}
};

module.exports = apiController;
