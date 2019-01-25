const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Weight = require("../models/weight")

router.get("/", (req, res) => {
    res.render("index", {title: 'Weight List Page'})
})

router.get("/new", (req, res) => {
    res.render("new", {title: 'New Weight Page'})
})

router.get("/weights/:id", (req, res) => {
    const id = req.params.id
    res.render("show", {title: 'Show Weight Page', id:id})
})

router.get("/weights/:id/edit", (req, res) => {
    const id = req.params.id
    res.render("edit", {title: 'Edit Weight Page', id:id})
})

router.get('/api/weights', async (req, res) => {
    const weights = await Weight.find();
    const n = weights.length
    const maxAverage = weights.reduce((a,b)=> a + b.maxWeight,0) / n
    const minAverage = weights.reduce((a,b)=> a + b.minWeight,0) / n
    const diffAverage = maxAverage - minAverage
    res.send({weights, maxAverage, minAverage, diffAverage});
});
  
router.get('/api/weights/:id', async (req, res) => {
    const weight = await Weight.findById(req.params.id);
    res.send(weight);
});

router.post('/api/weights', async (req, res) => {
    const { date, minWeight, maxWeight } = req.body;

    const weight = new Weight({
        date,
        minWeight,
        maxWeight
    });

    try {
        await weight.save();
        res.send(weight);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/api/weights/:id', async (req, res) => {

    const weight = await Weight.findById(req.params.id);

    for (let key in req.body){
        if(weight[key] != req.body[key]){
            weight[key] = req.body[key]
        }
    }
    try {
        await weight.save();
        res.send(weight);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/api/weights/:id', async (req, res)=>{
    const weight = await Weight.findById(req.params.id);

    try {
        await weight.remove();
        res.send('Data berhasil dihapus!');
    } catch (err) {
        res.status(400).send(err);
    }
})
module.exports = router
