import { Outlet } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';

function App() {
  return (
    <div>
      <Outlet />
      <Toaster position="top-center" richColors/>
    </div>
  );
}

export default App;
