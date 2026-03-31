const ticketService = require("../services/ticketService.js");
exports.createTickets = async(req,res)=>{
    try{
        const {issue}= req.body;
        const userId =req.user.id;
        if(!issue){
            return res.status(404).json({message : "issue is required "})
        }
        const ticket = await ticketService.createTicket(userId,{issue});
        res.status(201).json({message : "ticket created",ticket})
    }catch(error){
        res.status(500).json("internal server error")
    }
}
exports.sendMessage = async(req,res)=>{
    try{
        const {ticketId ,message} = req.body;
        const senderType = req.user.type;
        if(!ticketId || !message){
            return res.status(404).json({message : "ticketId and message are required "})
        }
        const updatedTicket = await ticketService.sendMessage(ticketId, senderType, message);
        res.status(200).json({message : "message sent", updatedTicket})
    }catch(error){
        res.status(500).json("internal server error")
    }
}
exports.getUserTicket = async(req,res)=>{
    try{
        const userId = req.user.id;
        const tickets = await ticketService.getUserTickets(userId);
        res.status(200).json(tickets)
    }catch(error){
        res.status(500).json("internal server error")

    }
}
exports.getAllTickets = async(req,res)=>{
    try{
        const tickets = await ticketService.getAllTickets();
        if(!tickets || tickets.length === 0){
            return res.status(404).json({message : "no tickets found"})
        }
        res.status(200).json(tickets)
    }catch(error){
        res.status(500).json("internal server error")

    }
}

exports.closeTicket = async(req,res)=>{
    try{
        const {ticketId}= req.params;
        const updatedTicket = await ticketService.closeTicket(ticketId);
        res.status(200).json({message : "ticket closed", updatedTicket})
    }catch(error){
        res.status(500).json("internal server error")
    }
}