var express = require('express');
var bodyParser = require('body-parser');
var app = express();



app.get('/hello', function(res, req){
    res.send("Hello World!")
})

//this is a GET route
app.get('/products/:id', function(){
    console.log(req.params.id);
    res.send("you sent me :" + req.params.id);

});

//this is a POST route
app.post('/hello', function(){

});
//start the server
var server = app.listen(3000, function(){
    

    var host = server.address().address;
    var port = server.address().port;
   
    console.log('Example app listening at http://%s:%s', host, port);
   
   
});