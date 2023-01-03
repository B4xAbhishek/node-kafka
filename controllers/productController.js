const mongoose = require('mongoose')
const User = require('../models/UserModel')

const User = async (req,res) => {
  const UserId = req.params.id;
    User.find((err, people) => {
        if (err) return console.error(err);
        res.status(200).json(people)
      });
}


module.exports = { User }