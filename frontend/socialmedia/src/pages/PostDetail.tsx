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

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!post) return <div className="text-center mt-8">Post not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Social Media App</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: post.titleColor }}>{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <span className="text-gray-500">Posted by {post.author}</span>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-4 pb-4 border-b last:border-b-0">
              <p className="text-gray-700">{comment.content}</p>
              <span className="text-gray-500 text-sm">
                {comment.author} - {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Comment
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;