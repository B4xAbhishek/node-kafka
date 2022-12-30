const addressC = require('../models/addressModel')
const addAddress = (async (req, res) => {
    const {
      name,
      address
    } = req.body

    const updatedProduct = await addressC.save()
      res.json(updatedProduct)
    } 
  )


  module.exports = { addAddress }