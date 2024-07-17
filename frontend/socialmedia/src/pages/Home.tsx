import React, { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../services/api';
import PostList from '../components/PostList';
import CreatePostModal from '../components/CreatePostModal';
import { Post } from '../types';
import Navbar from '../components/Navbar';


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
      const error = err as Error;
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

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Navbar setIsCreateModalOpen={setIsCreateModalOpen} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </main>

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