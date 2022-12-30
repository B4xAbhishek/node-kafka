const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
	address: String
})

const Address = new mongoose.model("address", addressSchema);

module.exports = Address 