const express = require("express");
const router = express.Router();
const { createSubAdmin,getSubAdmin,loginSubAdmin,deleteSubAdmin,getAllSubAdmin} = require("../controllers/subAdminController.js");
const { validateCreate, validateLogin } = require("../validators/subAdmninValidator.js");
const validate = require("../middlewares/validateMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
/**
 * @swagger
 * tags:
 *   name: SubAdmin
 *   description: Sub-admin management APIs
 */

/**
 * @swagger
 * /api/sub-admin/login:
 *   post:
 *     summary: Login as sub-admin
 *     tags: [SubAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: subadmin@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/sub-admin/create:
 *   post:
 *     summary: Create sub-admin (Admin only)
 *     tags: [SubAdmin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       201:
 *         description: Sub-admin created
 */

/**
 * @swagger
 * /api/sub-admin/{email}:
 *   get:
 *     summary: Get sub-admin by email (Admin only)
 *     tags: [SubAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sub-admins
 */
/** 
 * @swagger
 * /api/sub-admin/{id}:
 *   delete:
 *     summary: Delete sub-admin (Admin only)
 *     tags: [SubAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sub-admin deleted

 */
/**
 * @swagger
 * /api/sub-admin/:
 *   get:
 *     summary: Get all sub-admins (Admin only)
 *     tags: [SubAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sub-admins
 * 
 */
 router.post("/create", validate(validateCreate), authMiddleware, adminMiddleware, createSubAdmin);
 router.get("/:email", authMiddleware, adminMiddleware, getSubAdmin);
 router.get("/",authMiddleware,adminMiddleware, getAllSubAdmin);

    router.post("/login", validate(validateLogin), authMiddleware,loginSubAdmin);
    router.delete("/:id", authMiddleware, adminMiddleware, deleteSubAdmin);

module.exports = router ;