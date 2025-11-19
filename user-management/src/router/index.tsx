import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyPage from '../pages/MyPage';
import MembersPage from '../pages/MembersPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/mypage/members",
    element: <MembersPage />,
  },
]);