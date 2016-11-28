var path = require('path');
var express = require('express');
var app = express();

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname) });
});

app.listen(8820, function () {
	console.log('AngularJS app is listening on port 8820!');
});
