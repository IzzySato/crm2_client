import Index from '../pages/index';
import Login from '../pages/login';

export const routers = [
  {
    name: 'home',
    path: '/',
    element: Index,
  },
  {
    name: 'login',
    path: '/login',
    element: Login,
  },
];
