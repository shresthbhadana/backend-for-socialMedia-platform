const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware.js");
const subAdminMiddleware = require("../middlewares/subAdminMiddleware.js")

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: Admin not found
 */

router.post("/login",adminController.adminLogin)



/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

router.get("/users",authMiddleware,subAdminMiddleware, adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/block/{id}:
 *   put:
 *     summary: Block user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User blocked
 *       404:
 *         description: User not found
 */

router.put("/users/block/:id", authMiddleware,adminMiddleware,adminController.blockUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 */

router.delete("/users/:id", authMiddleware,adminMiddleware,adminController.deleteUser);

/**
 * @swagger
 * /api/admin/posts:
 *   get:
 *     summary: Get all posts (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 */

router.get("/posts", authMiddleware, adminMiddleware, adminController.getAllPosts);

/**
 * @swagger
 * /api/admin/posts/{id}:
 *   delete:
 *     summary: Delete post (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 */

router.delete("/posts/:id", authMiddleware, adminMiddleware, adminController.deletePost);

module.exports = router;