var https = require('https');

// Load Configuration
var configVars = require('../config/configVars.json');

var apiController = {
	stubhub	:  	function(req,res){
					var options = {
						host: 'api.stubhub.com',
						path: '/search/catalog/events/v3?status=active&city=Denver&sort=eventDateLocal',
						headers : {"Authorization": "Bearer " + configVars.stubhubAppToken }
					};

					var req = https.get(options, function(res){

						var chunks = [];

						res.on('data', function(chunk){
							
							chunks.push(chunk);
						
						}).on('end', function(){

							var body = Buffer.concat(chunks);

							console.log(JSON.parse(body));

						});
					});

					req.on('error', function(e){
						console.log('Error: ' + e.message);
					});

					res.sendStatus(res.statusCode);

				}
};

module.exports = apiController;