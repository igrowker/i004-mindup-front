import App from "../App";
import RegisterForm from "../pages/RegisterForm";
import Onboarding from "../pages/Onboarding";
import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import ForgotPassword from "../pages/ForgotPassword";
import AppointmentManage from "../pages/AppointmentManage";
import Questionnaire from "../pages/Questionnaire";
import ProtectedRoute from "./ProtectedRoute";
import DynamicProfile from "./DynamicProfile";
import DynamicHome from "./DynamicHome";
import SelectedRoute from "./DynamicSelected";
import PublicRoute from "./PublicRoute";
import MyPatients from "../pages/MyPatients";
import MyDates from "../pages/MyDates";
import Assistance from "../pages/Assistance";
import Emergency from "../pages/Emergency";
import ChatPattient from "../pages/ChatPattient";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <RegisterForm />
          </PublicRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "onboard",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "questionnaire",
        element: <Questionnaire />,
      },
      {
        path: "emergency",
        element: (
          <ProtectedRoute>
            <Emergency />
          </ProtectedRoute>
        ),
      },

      {
        path: "assistance",
        element: (
          <ProtectedRoute>
            <Assistance />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <DynamicProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <DynamicHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-appointment",
        element: (
          <ProtectedRoute>
            <AppointmentManage />
          </ProtectedRoute>
        ),
      },
      {
        path: "selected",
        element: (
          <ProtectedRoute>
            <SelectedRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: "mypatients",
        element: (
          <ProtectedRoute>
            <MyPatients />
          </ProtectedRoute>
        ),
      },
      {
        path: "mydates",
        element: (
          <ProtectedRoute>
            <MyDates />
          </ProtectedRoute>
        ),
      },
      {
        path: "chatpettient",
        element: <ChatPattient />,
      },
    ],
  },
]);
