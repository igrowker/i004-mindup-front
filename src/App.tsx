import { Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './pages/profile';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
}

export default App;
