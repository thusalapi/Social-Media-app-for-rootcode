import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <Link key={post._id} to={`/post/${post._id}`}>
        <div style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3 style={{ color: post.titleColor }}>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <span>{post.commentCount || 0} Comments</span>
        </div>
      </Link>
    ))}
  </div>
);

export default PostList;