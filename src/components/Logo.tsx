
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-primary">
      <div className="rounded-full bg-primary text-white p-1.5">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path d="M5.5 5a2.5 2.5 0 0 1 5 0v14a2.5 2.5 0 0 0 5 0V9a2.5 2.5 0 0 1 5 0v7"></path>
        </svg>
      </div>
      <span className="font-semibold text-lg">FlowPro</span>
    </Link>
  );
};

export default Logo;
