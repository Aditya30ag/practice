"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { LogOut, Bell, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = ({ user }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const notifications = [
    { id: 1, text: "New order received", time: "5m ago" },
    { id: 2, text: "Monthly report ready", time: "1h ago" },
    { id: 3, text: "System update completed", time: "2h ago" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/images/_12783215-fe96-477b-8bf2-65e20cd01d0b.jpg"
                alt="Logo"
                className="w-8 h-8 rounded"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Dashboard</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <p className="text-sm text-gray-900">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <img
                src="/images/_12783215-fe96-477b-8bf2-65e20cd01d0b.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full ring-2 ring-white"
              />
              <div className="hidden md:block">
                <p className="font-medium text-gray-900">{localStorage.getItem('name')}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm hover:shadow space-x-2"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2">
              <img
                src="/images/_12783215-fe96-477b-8bf2-65e20cd01d0b.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{localStorage.getItem('name')}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="px-3 py-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </div>
            <div className="px-3 py-2">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;