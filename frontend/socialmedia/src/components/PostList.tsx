import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <Link key={post._id} to={`/post/${post._id}`}>
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
          <h3 className="text-xl font-semibold mb-2" style={{ color: post.titleColor }}>
            {post.title}
          </h3>
          <p className="text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>
          <span className="text-blue-500">{post.commentCount || 0} Comments</span>
        </div>
      </Link>
    ))}
  </div>
);

export default PostList;