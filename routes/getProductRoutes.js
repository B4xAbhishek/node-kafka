const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/ProductModel')

//search a record
router.get('/search/:id', async (req, res) => {
    const productId = req.params.id;
    Product.find({ name: productId }, function(err, people) {
        if (err) return console.error(err);
        res.status(200).json(people)
      });    
  });

  //get all records
  router.get('/g', async (req, res) => {
    const productId = req.params.id;
    Product.find((err, people) => {
        if (err) return console.error(err);
        res.status(200).json(people)
      });
  });
 
  //put a record 

  router.patch('/p/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  Product.findByIdAndUpdate(id, updates, { new: true }, (err, updatedResource) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(updatedResource);
  });
});

  
  //delete
  router.delete('/d/:id', async (req, res) => {
    const productId = req.params.id;
    Product.deleteOne({ id: productId }, function(err, people) {
        if (err) return console.error(err);
        res.status(200).json(people)
      });    
  });

module.exports = router