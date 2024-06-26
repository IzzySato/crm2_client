import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { setToken } from '../store/slices/pages/authSlice';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        localStorage.setItem('token', token);
        store.dispatch(
          setToken({ token })
        );
        navigate('/');
      } else {
        navigate('/login');
      }
      isInitialized.current = true;
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;