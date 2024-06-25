import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      console.log('token', token)
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        console.log('authcallback /login')
        navigate('/login');
      }
      isInitialized.current = true;
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;