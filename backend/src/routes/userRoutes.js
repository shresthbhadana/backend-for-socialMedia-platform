const express = require('express');
const router = express.Router();



const {
  getUser,
  updateUser,
  followUser,
  unfollowUser
} = require("../controllers");
const validate = require("../middlewares/validateMiddleware.js");
const { updateUserSchema, followSchema } = require("../validators/userValidator");

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to users
 *
 * /api/users/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user profile
 *     description: |
 *       Logged-in user updates their profile information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/users/follow/{id}:
 *   post:
 *     tags:
 *       - User
 *     summary: Follow a user
 *     description: |
 *       Logged-in user follows another user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to follow
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/users/unfollow/{id}:
 *   post:
 *     tags:
 *       - User
 *     summary: Unfollow a user
 *     description: |
 *       Logged-in user unfollows another user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */



router.get('/:id', getUser); 


         
router.put('/update',validate(updateUserSchema), updateUser);   


router.post('/follow/:id',  validate(followSchema),followUser);   


router.post('/unfollow/:id', unfollowUser); 

module.exports = router;