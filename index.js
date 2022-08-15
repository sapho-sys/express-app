'use strict';
var express = require('express');
//import express handlebars
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const flash = require('express-flash');
var app = express();
const greetings = require('./greet-factory');
const greeter = require('./greet2-factory');
const greetingRouters = require('./routes/routes')
const pgPromise = require('pg-promise')
const pgp = pgPromise({});


const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_users';

const config = { 
	connectionString
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}



const db = pgp(config);


const greetingsDB = greetings(db);
const greetPeople = greeter();

let greetRouter = greetingRouters(greetingsDB,greetPeople);


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
    secret: 'flash the mesaage',
    resave: false,
    saveUninitialized: true
    
    
}));

// initialise the flash middleware
app.use(flash());


app.get('/', greetRouter.defaultRoute);

app.post('/action', greetRouter.HomePage);

app.get('/detail', greetRouter.Detail);

app.get('/info/:username', greetRouter.Information);

app.post('/reset', greetRouter.Reset);


//start the server
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App running at http://localhost:" + PORT)
});