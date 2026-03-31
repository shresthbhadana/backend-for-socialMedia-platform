const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderType : {
        type : String,
        enum : ["admin","user"],
        required : true
    },
    message  :{
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const TicketSchema = new mongoose.Schema({
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
},
issue  : {
    type  : String,
    required : true
},
status  : {
    type : String,
    enum  : ["open","closed"],
    default  : "open"
},
messages  : [messageSchema]

},{timestamps : true});

module.exports = mongoose.model("Ticket",TicketSchema)