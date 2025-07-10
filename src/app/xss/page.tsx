// pages/xss.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function XSSDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(input);
  };

  // This runs after rendering and manually executes <script> tags
  useEffect(() => {
    if (outputRef.current) {
      const scripts = outputRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        newScript.text = oldScript.innerHTML;
        oldScript.replaceWith(newScript); // Replace to trigger execution
      });
    }
  }, [output]);

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>XSS Example with Script Execution</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter HTML or script'
          className='border p-2 mr-2 w-[50%]'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2'>
          Render
        </button>
      </form>

      <div className='mt-6'>
        <h2 className='text-lg font-semibold'>Rendered Output:</h2>
        <div
          ref={outputRef}
          className='border p-4 mt-2 bg-gray-100'
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </div>
    </main>
  );
}
