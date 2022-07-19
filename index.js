var express = require('express');
//import express handlebars
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
const greetings = require('./greet-factory');

//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/', function(req,res){
    res.render('home', {
        // numName: greetings.getCounter()
    })
});


//this is a POST route
app.post('/actions', function(req,res){
    greetings.greetMe(req.body.strName,req.body.lang);
    console.log(greetings.namesAdded());
    res.redirect('/')
    

});
//start the server
var server = app.listen(3000, function(){
    

    var host = server.address().address;
    var port = server.address().port;
   
    console.log('Example app listening at http://%s:%s', host, port);
   
   
});