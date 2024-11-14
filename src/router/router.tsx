import App from '../App'
import Profile from '../pages/Profile';
import RegisterForm from '../pages/RegisterForm';
import Onboarding from '../pages/Onboarding';

import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <RegisterForm /> },
        { path: "onboard", element: <Onboarding /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);