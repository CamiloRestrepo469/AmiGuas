import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Acceder a los datos personales del usuario
      const displayName = user.displayName; // Nombre completo
      const photoURL = user.photoURL; // Alias
      const phoneNumber = user.phoneNumber; // Teléfono

      // Puedes mostrar estos datos en tu componente
      setUserProfile({ displayName, photoURL, phoneNumber });
    }
  }, []);

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p>Nombre Completo: {userProfile.displayName}</p>
          <p>Alias: {userProfile.photoURL}</p>
          <p>Teléfono: {userProfile.phoneNumber}</p>
        </div>
      ) : (
        <p>No se han cargado los datos del usuario.</p>
      )}
    </div>
  );
};

export default UserProfile;
