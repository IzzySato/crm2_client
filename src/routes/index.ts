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
  {
    name: 'loginFail',
    path: '/login_fail',
    element: Login,
  },
  {
    name: 'page not found',
    path: '/page_not_found',
    element: Login,
  },
];
