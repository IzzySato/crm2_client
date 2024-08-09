import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import IntroPage from '../pages/intro';

type ProtectedRouteProps = {
  component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const token = useSelector((state: RootState) => state.auth.token); 

  return token ? <Component /> : <IntroPage />;
};

export default ProtectedRoute;
