import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import ProtectedRoute from "./routes/ProtectedRoute";

import App from "./App";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import MainDashboard from "./Components/pages/MainDashboard";
import Plans from "./Components/Dashboard_Components/Register/Plans";

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 Minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
