import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routers } from './routes';
import './stylesheets/cssReset.css';
import './stylesheets/globalCSS.css';
import axios, { AxiosInstance } from 'axios';

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //     const fetchUser = async () => {
  //         const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
  //         setUser(response.data);
  //     };

  //     fetchUser();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routers?.map(({ name, path, element: Component }) => (
          <Route key={name} path={path} element={<Component />} />
        ))}
        {/* Redirect to a page saying "Access Denied" if the route is not allowed */}
        <Route path="/access-denied" element={<div>Access Denied</div>} />
        {/* Redirect to a default page or login page if no matching route is found */}
        <Route path="*" element={<Navigate to="/access-denied" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
