import { Request, Response } from 'express';
import Comment from '../models/Comment.js';

export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, author, postId } = req.body;
    const newComment = new Comment({ content, author, post: postId });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};