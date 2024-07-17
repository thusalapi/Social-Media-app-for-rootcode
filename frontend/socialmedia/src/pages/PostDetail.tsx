import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, createComment } from '../services/api';
import { Post, Comment } from '../types';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPost(id);
      setPost(response.data.post);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await createComment({ content: newComment, author: 'Anonymous', postId: id });
      setNewComment('');
      fetchPost();
    } catch (error) {
      console.error('Error creating comment:', error);
      setError('Failed to post comment. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h2 style={{ color: post.titleColor }}>{post.title}</h2>
      <p>{post.content}</p>
      <h3>{comments.length} Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <small>{comment.author} - {new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="New Comment Text"
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;