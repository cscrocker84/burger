var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// serve static content for the app from the public directory
app.use(express.static("public"));

// parse body requests as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set handlebars
var exhbs = require("express-handlebars");

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