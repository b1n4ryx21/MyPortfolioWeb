const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        unique: true,
        type: String
    },
    message: String
})



const User = mongoose.model("lead", UserSchema, "leads")

module.exports = User