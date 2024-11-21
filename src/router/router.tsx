import App from '../App';
import RegisterForm from '../pages/RegisterForm';
import Onboarding from '../pages/Onboarding';
import { createBrowserRouter } from 'react-router-dom';
import HomePsychologist from '../pages/HomePsychologist';
import LoginForm from '../pages/LoginForm';
import ForgotPassword from '../pages/ForgotPassword';
import Modal from '../components/modal/Modal';
import AppointmentManage from '../pages/AppointmentManage';
import Questionnaire from '../pages/Questionnaire';
import ProfilePacient from '../pages/ProfilePacient';
import ProfileProfessional from '../pages/ProfileProfessional';
import HomePacient from '../pages/HomePacient';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'register', element: <RegisterForm /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: '', element: <LoginForm /> },
      { path: 'onboard', element: <Onboarding /> },
      { path: 'profilePacient', element: <ProfilePacient /> },
      { path: 'profileProfessional', element: <ProfileProfessional /> },
      { path: 'home', element: <HomePsychologist /> },
      { path: 'home2', element: <HomePacient /> },
      { path: 'manage-appointment', element: <AppointmentManage /> },
      //esta ruta es para probar el mdodal
      { path: 'modal', element: <Modal /> },
      { path: 'questionnaire', element: <Questionnaire /> },
    ],
  },
]);
