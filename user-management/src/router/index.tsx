import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  }
])