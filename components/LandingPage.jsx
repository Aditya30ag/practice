"use client";
import React from 'react';

import { BarChart2, PieChart, TrendingUp, LineChart } from 'lucide-react';
import Link from 'next/link';

const FloatingIcon = ({ children, className }) => (
  <div className={`absolute transform transition-all duration-1000 ease-in-out hover:scale-110 ${className}`}>
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-blue-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
      {children}
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 animate-pulse delay-300" />
      </div>

      {/* Floating icons */}
      <FloatingIcon className="top-20 left-[15%]">
        <BarChart2 className="w-8 h-8 text-blue-600" />
      </FloatingIcon>

      <FloatingIcon className="top-40 right-[15%]">
        <PieChart className="w-8 h-8 text-indigo-600" />
      </FloatingIcon>

      <FloatingIcon className="bottom-32 left-[20%]">
        <TrendingUp className="w-8 h-8 text-green-600" />
      </FloatingIcon>

      <FloatingIcon className="bottom-48 right-[20%]">
        <LineChart className="w-8 h-8 text-purple-600" />
      </FloatingIcon>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome to Business Dashboard
          </h1>
          
          <p className="mt-6 text-xl text-gray-600">
            Your all-in-one solution for business analytics and management
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Real-time Analytics</h3>
              <p className="mt-2 text-sm text-gray-600">Track your business performance with live data updates</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-indigo-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Smart Reports</h3>
              <p className="mt-2 text-sm text-gray-600">Generate comprehensive insights with one click</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-purple-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Growth Tracking</h3>
              <p className="mt-2 text-sm text-gray-600">Monitor your business growth with advanced metrics</p>
            </div>
          </div>
        </div>
        <Link href="/login">
  <div className="flex justify-center">
    <button className="py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
      Get Started
    </button>
  </div>
</Link>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      </div>
    </div>
  );
}