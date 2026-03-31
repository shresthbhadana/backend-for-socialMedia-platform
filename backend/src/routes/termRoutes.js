 const express = require("express");
const router = express.Router();
const {getTerms,createTerms,updateTerms}=require("../controllers/termController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Terms
 *   description: Terms and conditions management endpoints
 */

/**
 * @swagger
 * /api/terms/{title}:
 *   get:
 *     summary: Get terms by title
 *     tags: [Terms]
 *     description: |
 *       Retrieves terms and conditions content by title (public endpoint)
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Terms title identifier
 *         example: "Terms and Conditions"
 *     responses:
 *       200:
 *         description: Terms retrieved successfully
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
 *                     title:
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
 *         description: Terms not found
 *       500:
 *         description: Internal server error
 */
router.get("/:title", getTerms);

/**
 * @swagger
 * /api/terms/create:
 *   post:
 *     summary: Create new terms and conditions (Admin only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates new terms and conditions. Requires admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Terms title
 *                 example: "Terms and Conditions"
 *               content:
 *                 type: string
 *                 description: Terms content in HTML or plain text
 *                 example: "By using this service, you agree to our terms..."
 *     responses:
 *       201:
 *         description: Terms created successfully
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
 *         description: Title and content are required
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal server error
 */
router.post("/create", authMiddleware, adminMiddleware, createTerms);

/**
 * @swagger
 * /api/terms/update:
 *   put:
 *     summary: Update terms and conditions (Admin only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates existing terms and conditions. Requires admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Terms title
 *                 example: "Terms and Conditions"
 *               content:
 *                 type: string
 *                 description: Updated terms content
 *                 example: "Updated terms..."
 *     responses:
 *       200:
 *         description: Terms updated successfully
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
 *         description: Title and content are required
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Terms not found
 *       500:
 *         description: Internal server error
 */
router.put("/update", authMiddleware, adminMiddleware, updateTerms)

module.exports = router;