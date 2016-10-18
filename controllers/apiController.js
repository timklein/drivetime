var https = require('https');
var fs = require('fs');
var eventDetails = require('../models/eventDetails.js');

// Load Configuration
// var configVars = require('../config/configVars.json');
var stubhubAppToken = process.env.STUBHUB_TOKEN /*|| 	configVars.stubhubAppToken*/;

var apiController = {
	stubhub	:  	function(req,res){
					var options = {
						host: 'api.stubhub.com',
						path: '/search/catalog/events/v3?status=active&city=Denver&sort=eventDateLocal&rows=50',
						headers : { "Authorization": "Bearer " + stubhubAppToken }
					};

					var onComplete = function(){
						res.render('index', { eventDetails : eventDetails });
					};

					https.get(options, function(res){

						var chunks = [];

						res.on('data', function(chunk){
							
							chunks.push(chunk);
						
						}).on('end', function(){

							var body = JSON.parse(Buffer.concat(chunks));

							eventDetails = [];
							var keyVenues = [4602, 1683, 33370];
							var exclude = [9614457, 9583788];

							for (var i in body.events) {

								console.log(i + ' ' + (body.events.length - 1) );

								var event = body.events[i].name;
								var id = body.events[i].id;
								var venue = body.events[i].venue.name;
								var venueID = body.events[i].venue.id;
								var eventDate = body.events[i].eventDateLocal.substr(0,10);
								var today = new Date().toISOString().substr(0,10);

								if ( i == (body.events.length-1) ) {
									onComplete();
								}

								if (eventDate === today && keyVenues.indexOf(venueID) != -1 && exclude.indexOf(id) === -1 ) {

									eventDetails.push(body.events[i]);
									console.log('You have the ' + event + ' today at ' + venue + '!');

								}
							}

							fs.writeFile('./data/events.json', JSON.stringify(eventDetails), (err) => {
								if (err) throw err;
								console.log('Saved');
							
							});

						});

					});

				},

	today : function(req, res){
				setTimeout( res.render('today', {eventDetails : eventDetails}), 3000);
			} 
};

module.exports = apiController;