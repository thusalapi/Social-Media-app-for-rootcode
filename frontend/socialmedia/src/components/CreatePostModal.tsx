import React, { useState } from "react";
import { createPost } from "../services/api";
import { POST_COLORS } from "../constants";

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  onPostCreated,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleColor, setTitleColor] = useState("blue");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createPost({ title, content, author: "Anonymous", titleColor });
      onPostCreated();
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-gray-200 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Create Post
          <button
            onClick={onClose}
            className="float-right text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-800 text-white rounded"
          />
          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-800 text-white rounded h-32"
          />
          <div className="mb-4">
            <span className="mr-2 text-white">Title Color:</span>
            {POST_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setTitleColor(color)}
                className={`w-6 h-6 rounded-full mr-2 ${
                  titleColor === color
                    ? "ring-2 ring-offset-2 ring-gray-500"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 text-white rounded ${
              isSubmitting ? "bg-red-600" : "bg-red-800 hover:bg-red-900"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
