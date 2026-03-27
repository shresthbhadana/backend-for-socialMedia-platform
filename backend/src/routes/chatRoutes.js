const express = require('express');
const router = express.Router();
const {Message} = require("../models/messageModel.js")

const { sendMessageController, getConversationController } = require("../controllers/chatcontroller");
const validate = require("../middlewares/validateMiddleware.js");
const { sendMessageSchema } = require("../validators/chatValidator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - senderId
 *         - receiverId
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *           example: "65a1b2c3d4e5f67890123456"
 *         senderId:
 *           type: string
 *           example: "64f8e5c2b5f1d3a1e2345678"
 *         receiverId:
 *           type: string
 *           example: "64f8e5c2b5f1d3a1e2345679"
 *         message:
 *           type: string
 *           example: "Hello there!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a new message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *               - receiverId
 *               - message
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: "64f8e5c2b5f1d3a1e2345678"
 *               receiverId:
 *                 type: string
 *                 example: "64f8e5c2b5f1d3a1e2345679"
 *               message:
 *                 type: string
 *                 example: "Hello there!"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: senderId, receiverId and message are required
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/chat/{senderId}/{receiverId}:
 *   get:
 *     summary: Get all messages between two users
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f8e5c2b5f1d3a1e2345678"
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f8e5c2b5f1d3a1e2345679"
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       400:
 *         description: senderId and receiverId are required
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a new message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: "64f8e5c2b5f1d3a1e2345678"
 *               receiverId:
 *                 type: string
 *                 example: "64f8e5c2b5f1d3a1e2345679"
 *               message:
 *                 type: string
 *                 example: "Hello there!"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: senderId, receiverId and message are required
 *       500:
 *         description: Internal server error
 */

router.post("/send", validate(sendMessageSchema),sendMessageController);
/**
 * @swagger
 * /api/chat/{senderId}/{receiverId}:
 *   get:
 *     summary: Get all messages between sender and receiver
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       400:
 *         description: senderId and receiverId are required
 *       500:
 *         description: Internal server error
 */


router.get("/:senderId/:receiverId", getConversationController);


module.exports = router;