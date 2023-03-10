// #https://node-kafka.vercel.app/

require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const connectDB = require('./config/db')
const { UserList } = require('./Fakedata')
const axios = require("axios");


const app = express()
const os = require('os')
// console.log(os.userInfo())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
//db connection 
connectDB()
//routes
const addressRouter = require('./routes/addressRoutes')
const getProductRouter = require('./routes/getProductRoutes')
const userRouter = require('./routes/userRoutes')
const oAuthRouter = require('./routes/oAuthRoutes')

//env's 
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  } 

//app use 
app.get("/", (req,res) => {
  res.status(200).json({
    message: 'API Called '
});
})
app.use("/v1", addressRouter);
app.use("/", getProductRouter);
app.use("/user", userRouter);
app.use("/", oAuthRouter)


app.get("/stock/:id", async (req,res) => {
  const SYMBOL = req.params.id
  const API_KEY='2TDLK6RXWAUW8JS5'
  console.log(SYMBOL)
  const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=5min&apikey=${API_KEY}`);
  const result = response.data;
  res.send(result)
});

//listen to PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at ${port}`)
})