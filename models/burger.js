// import orm.js
var orm = require("../config/orm.js");



console.log("connected to burger.js");
// create the code that will call the ORM functions using burger specific input for the ORM
var burger = {
    all: function(cb) {
        orm.all("burgers", function(res){
            console.log(res);
            cb(res);

        });
    },
    // variables cols and cals are arrays
    create: function(cols, vals, cb) {
        orm.create("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(res){
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("burgers",condition, function(res) {
            cb(res);
        });
    }
}




// export 
module.exports = burger;