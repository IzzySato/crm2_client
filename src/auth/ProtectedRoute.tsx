import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ProtectedRouteProps = {
  component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const token = useSelector((state: RootState) => state.auth.token); 

  return token ? <Component /> : <></>;
};

export default ProtectedRoute;
