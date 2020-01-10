var express = require("express");
var exhbs = require("express-handlebars");
var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();

// serve static content for the app from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// Parse data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// middleware for handlebars
app.engine("handlebars", exhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes and give server acces
var routes = require("./controllers/burgers_controller");

app.use(routes);

// listen for requests
app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT)
})