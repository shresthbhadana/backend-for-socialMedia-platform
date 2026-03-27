const express = require("express");
const router = express.Router();
const { upload } = require('../utils/cloudinary.js');

const {
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
  likePostController,
  addCommentController,
  deleteCommentController,
  getCommentController,
} = require("../controllers/postcontroller.js");
const validate = require("../middlewares/validateMiddleware.js");
const { createPostSchema, updatePostSchema, commentSchema } = require("../validators/postValidator");
/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Operations related to posts
 *
 * /api/posts/create:
 *   post:
 *     tags:
 *       - Post
 *     summary: Create a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               media:
 *                 type: string
 *               userId : 
 *                type  : string
 *     responses:
 *       201:
 *         description: Post created
 *
 * /api/posts:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get all posts
 *     description: |
 *       Retrieves a list of all posts
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
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
 *
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Post
 *     summary: Update a post by ID
 *     description: |
 *       Update body or media of a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               media:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: At least one field is required to update
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete a post by ID
 *     description: |
 *       Deletes a post with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *
 * /api/posts/like/{id}:
 *   post:
 *     tags:
 *       - Post
 *     summary: Like a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to like
 *     responses:
 *       200:
 *         description: Post liked
 *
 * /api/posts/{id}/comment:
 *   post:
 *     tags:
 *       - Post
 *     summary: Add a comment to a post
 *     description: |
 *       Adds a new comment to the post with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user adding the comment
 *               text:
 *                 type: string
 *                 description: Comment text
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: userId and text are required
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *
 * /api/posts/{id}/comments/{commentId}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete a comment from a post
 *     description: |
 *       Deletes a comment with given commentId from the post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Post or Comment not found
 *       500:
 *         description: Internal server error
 *
 * /api/posts/{id}/comments:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get all comments for a post
 *     description: |
 *       Retrieves all comments for the post with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   text:
 *                     type: string
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.post("/create", upload.single('media'), validate(createPostSchema), createPostController);

router.get("/", getPostController);

router.put("/:id",validate(updatePostSchema), updatePostController);


router.delete("/:id", deletePostController);


router.post("/:id/like", likePostController);


 
router.post("/:id/comment",validate(commentSchema),addCommentController);


router.delete("/:id/comments/:Id", deleteCommentController);

router.get("/:id/comments", getCommentController);

module.exports = router;


