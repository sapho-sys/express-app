var express = require('express');
//import express handlebars
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const flash = require('express-flash');
var app = express();
const greeting = require('./greet-factory')([]);
const {Pool} = require('pg');
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
	useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:localhost:3011/my_users';

const pool = new Pool({
	connectionString,
	ssl : {
		rejectUnauthorized:false
	}
});






 

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

       let greeter = greeting.greetMsg();

       let greetedUsers = greeting.getCounter();

       console.log(greeting.greetMsg());
       console.log(greeting.getCounter());
       console.log(greeting.namesAdded());
       console.log(greeting.storedData());
    
    res.render('index',{
        greeter,
        greetedUsers
    })

});

app.get('/detail', function(req,res){
   
    res.render('detail', {
    
        allUsers: greeting.namesAdded()

    });
} );

app.post('/reset', );


//start the server
const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App running at PORT:", PORT)
});