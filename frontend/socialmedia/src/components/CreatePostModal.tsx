import React, { useState } from 'react';
import { createPost } from '../services/api';

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleColor, setTitleColor] = useState('blue');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createPost({ title, content, author: 'Anonymous', titleColor });
      onPostCreated();
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '500px', width: '100%' }}>
        <h2>Create Post <button onClick={onClose} style={{ float: 'right', border: 'none', background: 'none', fontSize: '1.5em', cursor: 'pointer' }}>×</button></h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea 
              placeholder="Description" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              style={{ width: '100%', height: '100px', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            Title Color:
            <button type="button" onClick={() => setTitleColor('blue')} style={{ backgroundColor: 'blue', width: '20px', height: '20px', margin: '0 5px', border: titleColor === 'blue' ? '2px solid black' : 'none' }}></button>
            <button type="button" onClick={() => setTitleColor('yellow')} style={{ backgroundColor: 'yellow', width: '20px', height: '20px', margin: '0 5px', border: titleColor === 'yellow' ? '2px solid black' : 'none' }}></button>
            <button type="button" onClick={() => setTitleColor('red')} style={{ backgroundColor: 'red', width: '20px', height: '20px', margin: '0 5px', border: titleColor === 'red' ? '2px solid black' : 'none' }}></button>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;