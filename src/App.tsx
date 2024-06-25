import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routers } from './routes';
import './stylesheets/cssReset.css';
import './stylesheets/globalCSS.css';
import AuthCallback from './auth/AuthCallBack';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routers?.map(({ name, path, element: Component, protectedRoute }) =>
          protectedRoute ? (
            <Route
              key={name}
              path={path}
              element={<ProtectedRoute component={Component} />}
            />
          ) : (
            <Route key={name} path={path} element={<Component />} />
          )
        )}
        {/* Redirect to a page saying "Access Denied" if the route is not allowed */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/access-denied" element={<div>Access Denied</div>} />
        {/* Redirect to a default page or login page if no matching route is found */}
        <Route path="*" element={<Navigate to="/access-denied" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
