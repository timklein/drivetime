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

					https.get(options, function(res){

						var chunks = [];

						res.on('data', function(chunk){
							
							chunks.push(chunk);
						
						}).on('end', function(){

							var body = JSON.parse(Buffer.concat(chunks));

							eventDetails = [];
							var keyVenues = [4602, 1683, 33370];

							for (var i in body.events) {

								var event = body.events[i].name;
								var venue = body.events[i].venue.id;
								var eventDate = body.events[i].eventDateLocal.substr(0,10);
								var today = new Date().toISOString().substr(0,10);

								// console.log(body.events);
								// console.log(eventDate + ' ' + venue + ' ' + event);

								if (/*eventDate === today &&*/ keyVenues.indexOf(venue) != -1) {

									eventDetails.push(body.events[i]);
									console.log('You have the ' + event + ' today at ' + venue + '!');
									// console.log(eventDetails);

								}
							}

							fs.writeFile('./data/events.json', JSON.stringify(eventDetails), (err) => {
								if (err) throw err;
								console.log('Saved');
							});

						});
					
					});

					res.redirect('today');

				},

	today : function(req, res){
				setTimeout( res.render('today', {eventDetails : eventDetails}), 3000);
			} 
};

module.exports = apiController;