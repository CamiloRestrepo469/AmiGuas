// Importaciones de módulos y componentes necesarios
import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginPage from './pages/LoginPage';
import Homepages from './pages/homepages';
import { auth } from './firebase';
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import SelectUser from './components/SelecUser'; // Importa el componente SelectUser
import Chat from './components/Chat';

function App() {
  // Estado para el usuario actual y el usuario seleccionado
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Efecto para manejar el cambio en la autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Limpia el efecto cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // Obtiene el usuario actual del contexto
  const { currentUser } = useContext(AuthContext);

  // Componente para redirigir si no hay un usuario autenticado
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Maneja la selección de usuario
  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  // Renderizado del componente principal
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la página de inicio de sesión */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />

        {/* Ruta para la página principal */}
        <Route
          path="/"
          element={
            user ? (
              <Homepages>
                <SelectUser onUserSelected={handleUserSelected} />
              </Homepages>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta para la página de inicio protegida */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home selectedUser={selectedUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
