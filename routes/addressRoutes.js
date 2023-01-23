const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
const sendMail = require('../utils/SendMail')

// Load the model for the data you want to save
const Item = require('../models/addressModel');

function generateSlug(name) {
  return req.body.name
}

// Create a new POST route for your API
router.post('/post', (req, res) => {
  const name = req.body.name
  const address = req.body.address
  const slug = name
  const newItem = new Item({
    name,
    address,
    slug
  });

  // Save the data to the database
  newItem.save()
    .then((item) => {
      // sendMail();
      res.status(201).json(item);
       
    })
    .catch(err => {
      res.status(500).json({ message: 'Error saving item to database: ' + err });
    });
});



module.exports = router;
