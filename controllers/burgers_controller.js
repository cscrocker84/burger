var express = require("express");

// performs route handleing
var router = express.Router();

// import orms from burger.js
var burger = require("../models/burger.js");

// route handler for root route to display all burgers
router.get("/", function(req, res){
    // display all burgers
    burger.selectAll(function(data){
        // var for handlebar object
        var hbsObj = {
            // setting data in hbs as burgers
            burgers: data
        }
        console.log(hbsObj);
        // render index.html with data from burgers table
        res.render("index", hbsObj)
    });
});

// route handler to add a burger
router.post("/api/burgers", function(req, res){
    console.log("post attempt to /api/burgers")
    // orm to add a burger with data from body
    burger.insertOne(["burger_name"], [req.body.burger], function(data){
        // log new burger added and redirect to root route
        console.log("new burger added");
        res.redirect("/")
    });
});

// route to update a burger
router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    // orm to update on burger with data from body
    burger.updateOne({
        // update devoured from body
        devoured: "true"
    }, condition, function(result){
        // check to see if id exists
        if(result.changedRows === 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export router for server.js
module.exports = router;