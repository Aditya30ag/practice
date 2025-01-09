// app/login/page.js
"use client";
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import LoginButton from '@/components/LoginButton';

const LoginPage = () => {
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/dashboard');
    }
  })
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (credentials) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        router.push('/dashboard')
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      

          <LoginButton
            onSubmit={handleLogin}
            error={error}
            isLoading={isLoading}
          />
        
    </>
  );
};

export default LoginPage;