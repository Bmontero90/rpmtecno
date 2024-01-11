import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Password } from '@mui/icons-material';

const LoginForm = () => {
  // Estados para los campos de usuario y contraseña
  const [CI, setCI] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/usuario');
        setUsuarios(response.data);
        const listaUsuario = response.data;
        console.log('ListaUsuarios', listaUsuario);
        console.log(usuarios);
        
      } catch (error) {
        console.error('Error al obtener la lista de usuarios', error);
      }
    };

    fetchData();
  }, []); 

  // Manejar cambios en los campos de usuario y contraseña
  const handleCIChange = (event) => {
    setCI(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit  = async () => {
    event.preventDefault();

    try {
      // Realiza la solicitud para actualizar los datos del cliente en el servidor
      const response = await axios.get(`http://localhost:62164/api/usuario/${CI}`);
      const usuario = response.data;
      console.log('Usuario', usuario);

      // Verifica si el usuario existe y si la contraseña coincide
      if (usuario.CI == CI && usuario.Pass == password) {
        console.log('Inicio de sesión exitoso');
        // Realiza la redirección a la página de clientes
        window.location.href = '/clientes';
      } else {
        console.log('Cédula o contraseña incorrectas');
        // Muestra un mensaje de error o realiza acciones adicionales en caso de credenciales incorrectas
      }
    } catch (error) {
      console.error('Error al obtener el usuario', error);
      // Muestra un mensaje de error o realiza acciones adicionales en caso de error de solicitud
    }
  }


 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="CI">CI:</label>
        <input
          type="int"
          id="CI"
          name="CI"
          value={CI}
          onChange={handleCIChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
  );
};

export default LoginForm;
