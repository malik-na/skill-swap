import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./auth/SignUp/index.jsx";
import SignIn from "./auth/SignIn/index.jsx";
import { AuthProvider } from "./auth/AuthContext/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import ProtectedRoute from "./auth/ProtectedRoute/index.jsx";
import AppLayout from "./layouts/AppLayout";
import MyMatches from "./pages/MyMatches/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "my-matches",
        element: <MyMatches />,
      },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      // {
      //   path: "messages",
      //   element: <Messages />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
