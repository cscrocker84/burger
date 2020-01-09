var orm = require("../config/orm.js");

// set orms in burger
const burger = {
    selectAll: (cb) => {
        orm.selectAll(cb)
    },

    insertOne: (name, cb) => {
        orm.insertOne(name, cb)
    },

    updateOne: (set, where, cb) => {
        orm.updateOne(set, where, cb)
    },

    deleteOne: (id, cb) => {
        orm.deleteOne(id, cb)
    }

    
}

// export burger for burgers_controller to use
module.exports = burger;