import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginPage from './pages/LoginPage';
import Homepages from './pages/homepages';
import { useState, useEffect } from 'react'; 
import { auth } from './firebase';
import Cookies from 'universal-cookie';


function App() {

  const [user, setUser] = useState(null); 

  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
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
