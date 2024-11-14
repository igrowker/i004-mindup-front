import App from '../App';
import RegisterForm from '../pages/RegisterForm';
import Onboarding from '../pages/onboarding/Onboarding';

import { createBrowserRouter } from 'react-router-dom';

import HomePsychologist from '../pages/HomePsychologist';

import LoginForm from '../pages/LoginForm';
import Profile from '../pages/profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'register', element: <RegisterForm /> },
      { path: '', element: <LoginForm /> },
      { path: 'onboard', element: <Onboarding /> },
      { path: 'profile', element: <Profile /> },
      { path: 'home', element: <HomePsychologist /> },
    ],
  },
]);
