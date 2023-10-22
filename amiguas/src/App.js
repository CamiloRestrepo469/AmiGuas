import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginPage from './pages/LoginPage';
import Homepages from './pages/homepages';
import { useState, useEffect } from 'react'; // Importa useEffect
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null); // Inicializa con null

  useEffect(() => { // Utiliza useEffect para escuchar cambios de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  return (
    <div className="App">
      {!user ? (
        <LoginPage />
      ) : (
        <Homepages />
      )}
    </div>
  );
}

export default App;
