import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';


const router = express.Router();

router.get('/', getFeedPosts);

router.patch
