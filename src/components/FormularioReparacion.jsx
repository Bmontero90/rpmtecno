import React, { useState} from 'react';
import './FormularioReparacion.css';
//import { postServicios } from '../services/Api';
import axios from 'axios';
import { Button, Container, MenuItem, TextField } from '@mui/material';

export default function FormularioReparacion() { 
  const [formData, setFormData] = useState({
    numeroOrden : '',
    ciCliente : '',   
    modelo : '',
    tipoEquipo : '',
    tipoServicio : '',
    trabajoARealizar : '',
    tecnico : '',
    precioReparacion : '',
    fechaRecibido : '',
    fechaFinalizado : '',
    nota : '',
    idEstado : ''
  });

  ///////PARA EL SELECTOR DE TIPO DE SERVICIO
 


  ////////////////////////////////////////
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  const {
      numeroOrden,
      ciCliente,
      tipoEquipo,
      modelo,
      trabajoARealizar,
      tipoServicio,
      fechaRecibido,
      fechaFinalizado,
      tecnico,
      precioReparacion,
      idEstado,
      nota
  } = formData;

  try {
    const response = await axios.post('http://localhost:62164/api/servicio', {
      numeroOrden,
      ciCliente,
      tipoEquipo,
      modelo,
      trabajoARealizar,
      tipoServicio,
      fechaRecibido,
      fechaFinalizado,
      tecnico,
      precioReparacion,
      idEstado,
      nota
    });
    console.log(response);
    console.log('Reparación registrada correctamente.');
    
  } catch (error) {
    console.error('Error al registrar la reparación:', error);
  }
};

  return (
    <Container sx={{mt:5}}>
      <h2>Formulario de Reparación</h2>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">  
          <TextField 
          label='Numero de Orden'
          name='numeroOrden'
          value={formData.numeroOrden}
          onChange={handleInputChange}
          required
          fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Cédula'
            type="number"
            name="ciCliente"
            value={formData.ciCliente}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Tipo de Equipo'
            type="text"
            name="tipoEquipo"
            value={formData.tipoEquipo}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Modelo de Equipo'
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Reparación a realizar'
            type="text"
            name="trabajoARealizar"
            value={formData.trabajoARealizar}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            fullWidth 
          />
        </div>
        <div className="form-group">
           {/* abajo esto es el selector de el tipo servicio ( PC - CELULAR - IMPRESORA) */}
          <TextField
            label='Tipo de Servicio'
            type="text"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleInputChange}
            required
            fullWidth
            select
            helperText="Por favor, seleccione el servicio que desea realizar"
          >
          <MenuItem value='Reparación PC'>
            Reparación PC
          </MenuItem>
          <MenuItem value='Reparación de celular'>
            Reparación de celular
          </MenuItem>
          <MenuItem value='Reparación de impresora'>
            Reparación de impresora
          </MenuItem>
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            label='Fecha de Entrega'
            type="date"
            name="fechaRecibido"
            value={formData.fechaRecibido}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            label='Fecha Estimada de Reparación'
            type="date"
            name="fechaFinalizado"
            value={formData.fechaFinalizado}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
         {/* abajo esto es el selector de el tecnico */}
        <div className="form-group">
          <TextField
            label='Técnico'
            type="text"
            name="tecnico"
            value={formData.tecnico}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        <div className="form-group">
          <TextField
            label='Precio'
            type="text"
            name="precioReparacion"
            value={formData.precioReparacion}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        {/* abajo esto es el selector del estaado */}
        <div className="form-group">
          <TextField
            label='Estado'
            type="number"
            name="idEstado"
            value={formData.idEstado}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        <div className="form-group">
          <TextField
            label='Notas'
            type="textarea"
            name="nota"
            value={formData.nota}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        <Button variant="contained" type="submit">Registro</Button>     
      </form>
    </Container>
  );
};


