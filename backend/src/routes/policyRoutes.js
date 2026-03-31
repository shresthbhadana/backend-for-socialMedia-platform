 const express = require("express");
const router = express.Router();
const {getPolicy,createPolicy,updatePolicy}=require("../controllers/policyController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Policy
 *   description: Privacy policy management endpoints
 */

/**
 * @swagger
 * /api/policy/{type}:
 *   get:
 *     summary: Get policy by type
 *     tags: [Policy]
 *     description: |
 *       Retrieves policy content by type (public endpoint)
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy type (e.g., "privacy", "terms", "cookie")
 *         example: privacy
 *     responses:
 *       200:
 *         description: Policy retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     type:
 *                       type: string
 *                     content:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Internal server error
 */
router.get("/:type", getPolicy);

/**
 * @swagger
 * /api/policy/create:
 *   post:
 *     summary: Create a new policy (Admin only)
 *     tags: [Policy]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a new policy. Requires admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 description: Policy type identifier
 *                 example: privacy
 *               content:
 *                 type: string
 *                 description: Policy content in HTML or plain text
 *                 example: "This is our privacy policy..."
 *     responses:
 *       201:
 *         description: Policy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Type and content are required
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal server error
 */
router.post("/create", authMiddleware, adminMiddleware, createPolicy);

/**
 * @swagger
 * /api/policy/update:
 *   put:
 *     summary: Update policy (Admin only)
 *     tags: [Policy]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates an existing policy. Requires admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 description: Policy type identifier
 *                 example: privacy
 *               content:
 *                 type: string
 *                 description: Updated policy content
 *                 example: "Updated privacy policy..."
 *     responses:
 *       200:
 *         description: Policy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Type and content are required
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal server error
 */
router.put("/update", authMiddleware, adminMiddleware, updatePolicy)

module.exports = router;