const Ticket = require("../models/ticketModel");

exports.createTicket = async(data)=>{
    return await Ticket.create(data);
};


exports.getTicketById = async(id)=>{
    return await Ticket.findById(id).populate("userId","username email")
}

exports.getAllTicket = async()=>{
    return await Ticket.find().
    populate("userId")
}
exports.getUserTicket  = async(userId)=>{
    return await Ticket.find({userId : userId}).populate("userId","username email")
}
exports.closeTicket = async(ticketId)=>{
    return await Ticket.findByIdAndUpdate(ticketId,{status:"closed"},{new:true});

}       

exports.addMessage = async(ticketId,messageData)=>{
    const ticket = await Ticket.findById(ticketId);
    ticket.messages.push(messageData);
    return await ticket.save();
}