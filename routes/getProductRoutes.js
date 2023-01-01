const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/ProductModel')
const {
  getProduct, PatchProduct
} = require('../controllers/addressController')

//search a record
router.get('/search/:id', async (req, res) => {
    const productId = req.params.id;
    Product.find({ name: productId }, function(err, people) {
        if (err) return console.error(err);
        res.status(200).json(people)
      });    
  });

  //get all records
  router.get('/g', getProduct);
  //put a record 
  router.patch('/p/:id', PatchProduct);
  //delete one
  router.delete('/d/:id', async (req, res) => {
    const productId = req.params.id;
    Product.deleteOne({ id: productId }, function(err, people) {
        if (err) return console.error(err);
        res.status(200).json(people)
      });    
  });

  //delete Many

  router.delete('/g', (req, res) => {
    Product.deleteMany({ _id: { $in: req.body.ids } }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Records deleted successfully!');
      }
    });
  });
  

module.exports = router