const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - issue
 *             properties:
 *               issue:
 *                 type: string
 *                 description: The issue description
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, ticketController.createTickets);

/**
 * @swagger
 * /api/tickets/message:
 *   post:
 *     summary: Send a message in a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketId
 *               - message
 *             properties:
 *               ticketId:
 *                 type: string
 *                 description: The ticket ID
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/message", authMiddleware, ticketController.sendMessage);

/**
 * @swagger
 * /api/tickets/user:
 *   get:
 *     summary: Get user's tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's tickets retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/user", authMiddleware, ticketController.getUserTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets (admin only)
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tickets retrieved successfully
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, ticketController.getAllTickets);

module.exports = router;