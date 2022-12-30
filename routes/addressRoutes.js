const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')

// Load the model for the data you want to save
const Item = require('../models/addressModel');

// Create a new POST route for your API
router.post('/items', (req, res) => {
  const { name, address } = req.body;
  const newItem = new Item({
    name,
    address,
    slug:name
  });

  // Save the data to the database
  newItem.save()
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error saving item to database: ' + err });
    });
});



module.exports = router;
