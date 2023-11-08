import React, { useState} from 'react';
import './FormularioReparacion.css';
import axios from 'axios';
import { Button, Container, MenuItem, TextField } from '@mui/material';

export default function FormularioCliente() { 
  const [formData, setFormData] = useState({
    CI : '',
    Nombre : '',   
    Apellido : '',
    Telefono : '',
    Mail : ''    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  const {
      CI,
      Nombre,
      Apellido,
      Telefono,
      Mail
  } = formData;

  try {
    const response = await axios.post('http://localhost:62164/api/cliente', {
      CI,
      Nombre,
      Apellido,
      Telefono,
      Mail
    });
    console.log(response);
    console.log('Cliente registrado correctamente.');
    
  } catch (error) {
    console.error('Error al registrar el cliente:', error);
  }
};

  return (
    <Container sx={{mt:5}}>
      <h2>Formulario de Cliente</h2>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">  
          <TextField 
          label='Cédula'
          name='CI'
          value={formData.CI}
          onChange={handleInputChange}
          required
          fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Nombre'
            name="Nombre"
            value={formData.Nombre}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Apellido'
            name="Apellido"
            value={formData.Apellido}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Teléfono'
            name="Telefono"
            value={formData.Telefono}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Correo electrónico'
            type="mail"
            name="Mail"
            value={formData.Mail}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <Button variant="contained" type="submit">Crear</Button>     
      </form>
    </Container>
  );
};


