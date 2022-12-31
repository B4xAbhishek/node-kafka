require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const connectDB = require('./config/db')
const { UserList } = require('./Fakedata')


const app = express()
const os = require('os')
// console.log(os.userInfo())
connectDB()
//routes
const addressRouter = require('./routes/addressRoutes')
const getProductRouter = require('./routes/getProductRoutes')

//env's 
app.use(express.json())
app.use(morgan('dev'))

//app use 
app.use("/v1", addressRouter);
app.use("/", getProductRouter);

//File upload

//db connection 


//listen to PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at ${port}`)
})