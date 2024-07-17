import { Request, Response } from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';


export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, author, titleColor } = req.body;
      const newPost = new Post({ title, content, author, titleColor });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      const comments = await Comment.find({ post: post._id }).sort({ createdAt: -1 });
      res.json({ post, comments });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  export const getPostsWithCommentCount = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await Post.aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'post',
            as: 'comments'
          }
        },
        {
          $project: {
            title: 1,
            content: 1,
            author: 1,
            titleColor: 1,
            createdAt: 1,
            commentCount: { $size: '$comments' }
          }
        },
        { $sort: { createdAt: -1 } }
      ]);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };