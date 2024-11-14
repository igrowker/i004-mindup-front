import App from '../App'
import Profile from '../pages/Profile';
import RegisterForm from '../pages/RegisterForm';
import Onboarding from '../pages/Onboarding';

import { createBrowserRouter } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "register", element: <RegisterForm /> },
        { path: "login", element: <LoginForm /> },
        { path: "onboard", element: <Onboarding /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);