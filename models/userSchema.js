const mongoose = require("mongoose");


const User = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    appleId: String
})

