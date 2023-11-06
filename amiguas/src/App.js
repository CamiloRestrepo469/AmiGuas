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
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Nuevo estado para el usuario seleccionado

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const { currentUser } = useContext(AuthContext);

  const ProtecteRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Manejar la selección de usuario
  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to="/" replace />
          }
        />
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

        <Route
          path="/chat"
          element={
            <ProtecteRoute>
              <Chat selectedUser={selectedUser} />
            </ProtecteRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
