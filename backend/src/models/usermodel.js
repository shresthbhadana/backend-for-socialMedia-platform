const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    email : {
       type : String,
        required : true,
        unique : true
    },
      active : {
 type : Boolean,
 default:true
    },
    password : {
         type : String,
        required : true
    },
    
    
     createdAt :{
 type : Date,
 default : Date.now,
    },
    token : {
    type : String,
    default : ""
    }

})
const User  = mongoose.model("User",userSchema);
module.exports = User