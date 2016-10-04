var https = require('https');

// Load Configuration
var configVars = require('../config/configVars.json');

var apiController = {
	stubhub	:  	function(req,res){
					var options = {
						host: 'api.stubhub.com',
						path: '/search/catalog/events/v3?status=active&city=Denver&sort=eventDateLocal',
						headers : { "Authorization": "Bearer " + configVars.stubhubAppToken }
					};

					https.get(options, function(res){

						var chunks = [];

						res.on('data', function(chunk){
							
							chunks.push(chunk);
						
						}).on('end', function(){

							var body = JSON.parse(Buffer.concat(chunks));

							for (var i in body.events) {

								var event = body.events[i].name
								var venue = body.events[i].venue.name;
								var eventDate = body.events[i].eventDateLocal.substr(0,10);
								var today = new Date().toISOString().substr(0,10);

								if (eventDate === today && venue == 'Pepsi Center') {

								console.log('You have the fucking ' + event + ' today at ' + venue + '!');

								}
							}

						});
					});

					res.render('index');
					// res.sendStatus(res.statusCode);

				}
};

module.exports = apiController;