const mongoose = require('mongoose')
const Product = require('../models/ProductModel')

const getProduct = async (req,res) => {
  const productId = req.params.id;
    Product.find((err, people) => {
        if (err) return console.error(err);
        res.status(200).json(people)
      });
}

const PatchProduct = async( req,res)=> {
  const id = req.params.id;
  const updates = req.body;

  Product.findByIdAndUpdate(id, updates, { new: true }, (err, updatedResource) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(updatedResource);
  });
}
module.exports = { getProduct, PatchProduct }