var express = require('express');
//import express handlebars
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
const greeting = require('./greet-factory');
const greetingRoutes = require('./routes/route-factory')

const greetings = greeting(greetingRoutes);


//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', greetings.homeRoute);

app.post('/action', greetings.actionRoute);

app.get('/greeted', greetings.greetedUsers);

app.get('/overview/:username', greetings.overviewRoute);

app.post('/reset', routeGreetings.resetRoute);


//start the server
var server = app.listen(3000, function(){
    

    var host = server.address().address;
    var port = server.address().port;
   
    console.log('Example app listening at http://%s:%s', host, port);
   
   
});