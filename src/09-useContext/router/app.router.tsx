import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../pages/about/AboutPage";
import { LoginPage } from "../pages/auth/LoginPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/about",
    element: <AboutPage/>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);