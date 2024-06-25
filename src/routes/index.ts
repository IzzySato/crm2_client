import Index from '../pages/index';
import Login from '../pages/login';
import LoginFailed from '../pages/login/loginFailed';
import PageNotFound from '../pages/pageNotFound';

export const routers = [
  {
    name: 'home',
    path: '/',
    element: Index,
    protectedRoute: true,
  },
  {
    name: 'login',
    path: '/login',
    element: Login,
    protectedRoute: false,
  },
  {
    name: 'loginFail',
    path: '/login_fail',
    element: LoginFailed,
    protectedRoute: false,
  },
  {
    name: 'page not found',
    path: '/page_not_found',
    element: PageNotFound,
    protectedRoute: false,
  },
];
