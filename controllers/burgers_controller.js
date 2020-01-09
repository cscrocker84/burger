const express = require('express')
const burger = require('../models/burger')

const router = express.Router()

// router.get('/', (req, res) => {
//     res.send()
// })

router.get('/', (req, res) => {
    burger.selectAll((err, data) => {
        if (err) {
            return res.send(err)
        }

        res.render('index', {burgers: data})
    })
})

router.put('/burger', (req, res) => {
    const set = {
        devoured: req.body.devoured
    }
    const where = {
        id: req.body.id
    }

    burger.updateOne(set, where, (err, data) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }

        res.send(data)
    })
})

router.post('/burger', (req, res) => {
    // get the burger name
    const name = req.body.name

    // send to ORM
    burger.insertOne(name, (err, data) => {
        if (err) {
            return res.send(err)
        }

        res.json({
            success: true,
            insertId: data.insertId
        })
    })
})

router.delete('/burger', (req, res) => {
    const id = req.body.id

    burger.deleteOne(id, (err, data) => {
        if (err) {
            res.json({
                success: false
            })
        }

        res.json({
            success: true
        })
    })
})


module.exports = router