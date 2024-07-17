import React from 'react';

interface NavbarProps {
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

const Navbar = ({ setIsCreateModalOpen }: NavbarProps) => {
  return (
      <header className="bg-gray-800 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center pr-10">
          <h1 className="text-2xl font-bold">Social Media App</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Create Post
          </button>
        </div>
      </header>
  );
};

export default Navbar;