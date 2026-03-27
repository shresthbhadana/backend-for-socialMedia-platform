const express = require('express');
const router = express.Router();
const {getFeedController}= require('../controllers');
const validate = require("../middlewares/validateMiddleware.js");
const { feedQuerySchema } = require("../validators/feedValidator");



/**
 * @swagger
 * tags:
 *   - name: Feed
 *     description: Operations related to the feed
 *
 * /api/feed:
 *   get:
 *     tags:
 *       - Feed
 *     summary: Get feed posts
 *     description: |
 *       Retrieves a paginated list of posts for the feed
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: |
 *           Number of posts to return (default: 10)
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *         description: |
 *           Number of posts to skip for pagination (default: 0)
 *     responses:
 *       200:
 *         description: Successfully retrieved feed posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   body:
 *                     type: string
 *                   media:
 *                     type: string
 *                   likes:
 *                     type: integer
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/',validate(feedQuerySchema), getFeedController);

module.exports = router;