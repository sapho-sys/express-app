'use strict';
var express = require('express');
//import express handlebars
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const flash = require('express-flash');
var app = express();
const greeting = require('./greet-factory');
const pgPromise = require('pg-promise')
const pgp = pgPromise({});


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
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

const greetingsDB = greeting(db);


//config express as middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//css public in use
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'flash the mesaage',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }

}));


// initialise the flash middleware
app.use(flash());


app.get('/', async function (req, res) {
    req.flash('message', greetingsDB.greetMsg());

    res.render('index', {
        greetedUsers: await greetingsDB.getCounter(),
        greetUsers: await greetingsDB.greetMsg()


    })

});

app.post('/action', async function (req, res) {

    try {
        await greetingsDB.greetUser(req.body.username, req.body.choice);

        await greetingsDB.addNames(req.body.username, req.body.choice);

        let greeter = await greetingsDB.greetMsg();

        let greetedUsers = await greetingsDB.getCounter();

        res.render('index', {
            greeter,
            greetedUsers
        })
    } catch (error) {
        console.log(error);
    }

});

app.get('/detail', async function (req, res) {
    let bigData = await greetingsDB.namesAdded()
    res.render('detail', {
        allUsers: bigData
    });
});

app.get('/info/:username', async function (req, res){
    const user_greeted = req.params.username;
    const greetedNum = await greetingsDB.greetedPool(user_greeted);
    console.log('myCount:',greetedNum)
    res.render('info',{
        user_greeted,
        greetedNum



    })

})



app.post('/reset', async function (req, res) {
    await greetingsDB.resetDB();
    res.redirect('/');
});


//start the server
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App running at http://localhost:" + PORT)
});