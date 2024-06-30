import CustomerPage from '../pages/index';
import Login from '../pages/login';
import LoginFailed from '../pages/login/loginFailed';
import PageNotFound from '../pages/pageNotFound';
import ProductPage from '../pages/product';

export const routers = [
  {
    name: 'home',
    path: '/',
    element: CustomerPage,
    protectedRoute: true,
  },
  {
    name: 'product',
    path: '/product',
    element: ProductPage,
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
