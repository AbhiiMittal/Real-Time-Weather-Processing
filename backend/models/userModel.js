const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Enter Name"]
    },
    email : {
        type : String,
        required : [true,"Enter email"]
    },
    password : {
        type : String,
        required : true,
        minlength : [8,"minimum length should be 8"]
    }
},{timestamps : true})

const  userModel = mongoose.model('User',userSchema);

module.exports = userModel;