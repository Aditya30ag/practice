"use client";
import React from "react";
import { useRouter } from 'next/navigation';

const Navbar = ({user}) => {
  const router =useRouter();
  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/')
  };

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {user.image && (
            <img 
              src={user.image} 
              alt="Profile" 
              className="w-10 h-10 rounded-full" 
            />
          )}
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;