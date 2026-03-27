const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authcontroller.js');
const validate = require("../middlewares/validateMiddleware.js");
const { registerSchema, loginSchema } = require("../validators/authValidator.js");
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, userName, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */


router.post('/register', validate(registerSchema), register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login',validate(loginSchema), login);
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged-in user details
 *     description: Returns details of the currently logged-in user based on query params (userName)
 *     parameters:
 *       - in: query
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the logged-in user
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: userName is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/me',getMe); 
/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test API working
 *     responses:
 *       200:
 *         description: success
 */
router.get("/test", (req, res) => {
  res.send("working");
});

module.exports = router

