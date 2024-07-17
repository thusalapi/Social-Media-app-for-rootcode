import express from 'express';
import { getPostsWithCommentCount, createPost, getPostById } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPostsWithCommentCount);
router.post('/', createPost);
router.get('/:id', getPostById);

export default router;