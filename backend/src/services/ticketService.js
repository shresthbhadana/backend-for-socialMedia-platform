const ticketRepo = require("../repository/ticketRepo");

exports.createTicket = async (userId, data) => {
  return await ticketRepo.createTicket({ userId, issue: data.issue, messages: [] });
};

exports.sendMessage = async (ticketId, senderType, message) => {
  return await ticketRepo.addMessage(ticketId, { senderType, message });
};

exports.closeTicket = async (ticketId) => {
  return await ticketRepo.closeTicket(ticketId);
};

exports.getAllTickets = async () => {
  return await ticketRepo.getAllTicket();
};

exports.getUserTickets = async(userId) => {
    return await ticketRepo.getUserTicket(userId);
}
