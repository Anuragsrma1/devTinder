const mongoose = require("mongoose");

const connectDB = async() => { 
   await mongoose.connect(
        "mongodb+srv://anuragsharma0140:ramramG14_@nodejs.lco5b.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

