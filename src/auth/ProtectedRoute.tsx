import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated ? <Component /> : <></>;
};

export default ProtectedRoute;
