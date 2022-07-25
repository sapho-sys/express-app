var express = require('express');
//import express handlebars
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
var app = express();
const greeting = require('./greet-factory')([]);



 

//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// initialise session middleware - flash-express depends on it
app.use(session({
	secret : 'flash the mesaage',
	resave: false,
	saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.get('/', function(req,res){
    req.flash('message', greeting.greetMsg());

    
    res.render('index', {
        greetedUsers: greeting.getCounter(),
        greetUsers:greeting.greetMsg()
        
    })

});

app.post('/action', function(req, res){
   
       greeting.greetUser(req.body.username,req.body.choice);

       greeting.addNames(req.body.username,req.body.choice);

       greeting.getCounter();

       let greeter = greeting.greetMsg();

       let greetedUsers = greeting.getCounter();

       console.log(greeting.greetMsg());
       console.log(greeting.getCounter());
    
    res.render('index',{
        greeter,
        greetedUsers
    })

} );

app.get('/greeted', );

app.get('/detail/:username/:choice', function(){
    let userGreeted = greeting.addNames(req.params.username,req.params.choice);
    let greetedCount = greeting.getCounter(userGreeted);
    console.log(greeting.namesAdded())

    res.render('detail', {
        userGreeted,
        greetedCount

    });
} );

app.post('/reset', );


//start the server
const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App running at PORT:", PORT)
});