import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ProtectedRoute from './routes/ProtectedRoute';

import App from './App';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';

import MainDashboard from './Components/pages/MainDashboard'
// Modules
import Plans from './Components/Dashboard_Components/Register/Plans';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "plans",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Plans />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "TRAINER"]}>
            <MainDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
