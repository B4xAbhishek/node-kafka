const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
const User = require('../models/userModel')

const authUser = async(req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
}

module.exports = { authUser}