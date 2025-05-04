const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB successfully");
    })
}

module.exports = connectToDB;