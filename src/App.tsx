import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import useAuthorization from './hooks/useAuth';

function App() {
  useAuthorization(); // hook que realiza la autorizacion del user

  return (
    <div>
      <Outlet />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
