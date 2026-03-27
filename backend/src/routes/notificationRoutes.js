const express = require('express');
const router = express.Router();
const {getNotificationController: getNotification, readNotificationController: readNotification} = require('../controllers/notificontroller.js');
const validate = require("../middlewares/validateMiddleware.js");
const { notificationIdSchema, readNotificationSchema } = require("../validators/notificationValidator");

/**
 * @swagger
 * tags:
 *   - name: Notification
 *     description: Operations related to notifications
 *
 * /api/notifications:
 *   get:
 *     tags:
 *       - Notification
 *     summary: Get a notification by ID
 *     description: |
 *       Retrieves a notification based on the provided query parameter `id`
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID to fetch
 *     responses:
 *       200:
 *         description: Successfully retrieved notification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notification:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     message:
 *                       type: string
 *                     read:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Notification ID is required
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 *
 * /api/notifications/{id}/read:
 *   put:
 *     tags:
 *       - Notification
 *     summary: Mark notification as read
 *     description: |
 *       Marks the notification with the given ID as read
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID to mark as read
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       400:
 *         description: Invalid notification ID
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/',validate(notificationIdSchema), getNotification);


router.put('/:id/read',validate(readNotificationSchema),readNotification)




module.exports = router;