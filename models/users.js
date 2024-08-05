const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    uid:{
        type: String,
        unique: true,
    },
    
},{timestamps:true})

const User = mongoose.model("user",userSchema);

module.exports =  User;


