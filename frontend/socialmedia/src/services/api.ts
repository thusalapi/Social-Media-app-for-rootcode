import axios from 'axios';
import { Post, Comment } from '../types';

const API_URL = 'http://localhost:3000/api';

export const getPosts = () => axios.get<Post[]>(`${API_URL}/posts`);
export const getPost = (id: string) => axios.get<{ post: Post; comments: Comment[] }>(`${API_URL}/posts/${id}`);
export const createPost = (post: Omit<Post, '_id' | 'createdAt'>) => axios.post<Post>(`${API_URL}/posts`, post);
export const createComment = (comment: { content: string; author: string; postId: string }) => 
  axios.post<Comment>(`${API_URL}/comments`, comment);