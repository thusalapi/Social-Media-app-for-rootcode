import React, { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../services/api';
import PostList from '../components/PostList';
import CreatePostModal from '../components/CreatePostModal';
import { Post } from '../types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      const error = err as Error; // Type assertion to ensure we're working with an Error object
      if (error.message === 'Network Error') {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else {
        setError('Failed to load posts. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ... rest of the component code

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsCreateModalOpen(true)}>Create New Post</button>
      {isLoading ? (
        <div>Loading posts...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <PostList posts={posts} />
      )}
      {isCreateModalOpen && (
        <CreatePostModal
          onClose={() => setIsCreateModalOpen(false)}
          onPostCreated={fetchPosts}
        />
      )}
    </div>
  );
};

export default Home;