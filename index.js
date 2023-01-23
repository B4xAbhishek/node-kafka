// #https://node-kafka.vercel.app/g

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
app.use(cors({ origin: '*' }));
//db connection 
connectDB()
//routes
const addressRouter = require('./routes/addressRoutes')
const getProductRouter = require('./routes/getProductRoutes')
const userRouter = require('./routes/userRoutes')

//env's 
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  } 

//app use 
app.get("/", (req,res) => {
  res.send("API Running")
})
app.use("/v1", addressRouter);
app.use("/", getProductRouter);
app.use("/", userRouter);

//listen to PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at ${port}`)
})