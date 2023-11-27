import React, { useState, useEffect } from 'react';
import './FormularioReparacion.css';
import axios from 'axios';
import { Autocomplete, Button, Container, MenuItem, TextField, Typography } from '@mui/material';

export default function FormularioReparacion() { 
  
  const currentDate = new Date().toISOString().split('T')[0];

  
  const [formData, setFormData] = useState({
    numeroOrden : '',
    ciCliente : '',   
    modelo : '',
    tipoEquipo : '',
    tipoServicio : '',
    trabajoARealizar : '',
    tecnico : '',
    precioReparacion : '',
    fechaRecibido : currentDate,
    fechaFinalizado : '',
    nota : '',
    idEstado : '1'
  });

  
  

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/cliente');
        console.log('Clientes desde la API:', response.data);

        const formattedClientes = response.data.map((cliente) => ({ label: cliente.Nombre + ' ' + cliente.Apellido, value: cliente.CI }));
        console.log('Clientes formateados:', formattedClientes);

        setClientes(formattedClientes);
      } catch (error) {
        console.error('Error al obtener la lista de clientes', error);
      }
    };

    fetchData();
  }, []); 

  


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
    window.location.href = '/servicios';
    
  } catch (error) {
    console.error('Error al registrar la reparación:', error);
  }
};


  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de reparación</Typography>
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"          
          options={clientes}
          getOptionLabel={(option) => (option ? option.label : '')}
          fullWidth
          onChange={(event, newValue) => {
            setFormData({ ...formData, ciCliente: parseInt(newValue?.value, 10) || '' });
          }}
          renderInput={(params) => <TextField {...params} label="Cliente" />}
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
          <MenuItem value='1'>
            Reparación PC
          </MenuItem>
          <MenuItem value='2'>
            Reparación de celular
          </MenuItem>
          <MenuItem value='3'>
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
        {/* <div className="form-group">
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
        </div> */}
         {/* abajo esto es el selector de el tecnico */}
        <div className="form-group">
          <TextField
            label='Técnico'
            type="text"
            name="tecnico"
            value={formData.tecnico}
            onChange={handleInputChange}
            select
            required
            fullWidth
          >
            <MenuItem value='1'>
            Reparador de PC
          </MenuItem>
          <MenuItem value='2'>
          Reparador de celular
          </MenuItem>
          <MenuItem value='3'>
          Reparador de impresoras
          </MenuItem>
          
          </TextField>
          
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
        {/* <div className="form-group">
          <TextField
            label='Estado'
            type="number"
            name="idEstado"
            value={formData.idEstado}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div> */}
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
        <Button variant="contained" type="submit" fullWidth>Registro</Button>
    </form>
    </Container>
  );
};


