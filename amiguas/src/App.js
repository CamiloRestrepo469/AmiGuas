import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginPage from './pages/LoginPage';
import Homepages from './pages/homepages';
import { useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const {currentUser} = useContext(AuthContext)
  
  const ProtecteRoute = ({children}) =>{
    if (!currentUser) {
      return <Navigate to="/login" replace />
    }
    return children;
  };
  
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/login" element={
          !user ? <LoginPage /> : 
          <Navigate to="/" replace 
          />
        } 
          />
        <Route
          path="/"
          element={
            user ? <Homepages /> : 
            <Navigate to="/login" replace
             />
            }
        />

        <Route path='/home' element={ 
        <ProtecteRoute>
          <Home/>
        </ProtecteRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
