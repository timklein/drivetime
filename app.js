const express = require('express');
const app = express();
var eventful = require('eventful-node');
var config = require('./config/configVars.json');
var apiController = require('./controllers/apiController.js');

var client = new eventful.Client(config.eventfulAppKey);

 

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

// StubHub API Route
app.get('/', apiController.stubhub);

// Eventful API Route
app.get('/tst', function(req, res) {
	client.searchEvents({ location: 'denver', date: 'Sunday', sort_order: 'popularity' }, function(err, data){
		if(err){
			return console.error(err);
		}
  		
  		console.log(data);
		console.log('Recieved ' + data.search.total_items + ' events in ' + data.search.page_count + ' pages');
		console.log('Event listings: ');

		console.log(data.search);
  
		//print the title of each event 
		for(var i in data.search.events.event){
			console.log(data.search.events.event[i].title);
		}

	});

	res.render('index');

});

app.listen(3000, function() {
	console.log('Listening on port ' + app.get('port'));
});