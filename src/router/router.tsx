import App from '../App';
import RegisterForm from '../pages/RegisterForm';
import Onboarding from '../pages/Onboarding';
import { createBrowserRouter } from 'react-router-dom';
import HomePsychologist from '../pages/HomePsychologist';
import LoginForm from '../pages/LoginForm';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'register', element: <RegisterForm /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: '', element: <LoginForm /> },
      { path: 'onboard', element: <Onboarding /> },
      { path: 'profile', element: <Profile /> },
      { path: 'home', element: <HomePsychologist /> },
    ],
  },
]);
