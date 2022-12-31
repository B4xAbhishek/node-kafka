require("dotenv").config()
const mongoose = require('mongoose')

const uri = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
     mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        const connection = await mongoose.connection;
        connection.once('open', () => {
            console.log("Mongodb database connection established successfully !!");
        })
    } catch (error) {
        console.log("Can't connect I am sorry !!");
        process.exit(1)
    }
}

module.exports = connectDB