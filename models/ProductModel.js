const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    address: String
    // lastname: String,
    // gender: String,
    // age: Number,
})

const Product = new mongoose.model("addresses", ProductSchema)

module.exports = Product