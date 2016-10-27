const express = require('express');
const app = express();
var eventful = require('eventful-node');
var apiController = require('./controllers/apiController.js');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'), express.static(__dirname + '/node_modules/jquery/dist/'));

// StubHub API Routes
app.get('/', apiController.stubhub);

app.listen(3000, function() {
	console.log('Listening on port ' + app.get('port'));
});