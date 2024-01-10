import React, { useState, useEffect } from 'react';
import './FormularioReparacion.css';
import axios from 'axios';
import { Autocomplete, Button, Container, MenuItem, TextField, Typography } from '@mui/material';

export default function FormularioReparacion() { 
  
  const [servicios, setServicios] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];
  const [errorNumeroOrden,setErrorNumeroOrden] = useState(false);
  const [ordenBuscado, setOrdenBuscado] = useState('');
  const [editando, setEditando] = useState(true);
 

  
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
    idEstado : '1',
    Borrado : 0
  });  


  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/cliente');
        console.log('Clientes desde la API:', response.data);

        const formattedClientes = response.data.map((cliente) => ({ label: cliente.Nombre + ' ' + cliente.Apellido, value: cliente.CI }));
        console.log('Clientes formateados:', formattedClientes);

        const responseServicios = await axios.get('http://localhost:62164/api/servicio');
        setServicios(responseServicios.data);

        setClientes(formattedClientes);

        const tecnicosResponse = await axios.get('http://localhost:62164/api/empleado');
        setTecnicos(tecnicosResponse.data);

      } catch (error) {
        console.error('Error al obtener la lista de clientes', error);
      }
    };

    fetchData();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setOrdenBuscado(value);
    }
  

  const handleBlurNumeroOrden = () => {
    let estaPresente = false;
    console.log(ordenBuscado);
  
    servicios.forEach((servicio) => {
      console.log(servicio.NumeroOrden);
      if (servicio.NumeroOrden.toString() === ordenBuscado.toString()) {
        console.log(estaPresente);
        estaPresente = true;
        console.log(estaPresente);
      }
    });
  
    setErrorNumeroOrden(estaPresente);
    setEditando(estaPresente);
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
          label='Número de Orden'
          name='numeroOrden'
          value={formData.numeroOrden}
          onChange={handleInputChange}
          onBlur={handleBlurNumeroOrden}
          required
          fullWidth
          helperText={errorNumeroOrden ? 'El número de orden ya existe' : ''}
          error={errorNumeroOrden}
          />
        </div>
        <div className="form-group">
        <Autocomplete
          disablePortal
          id="combo-box-demo"          
          options={clientes}
          disabled={editando}
          getOptionLabel={(option) => (option ? option.label : '')}
          fullWidth
          onChange={(event, newValue) => {
            setFormData({ ...formData, ciCliente: parseInt(newValue?.value, 10) || '' });
          }}
          renderInput={(params) => <TextField {...params} label="Cliente"
          required />}
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
            InputProps={{
              readOnly: true,
            }}
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
            disabled={editando}
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
            disabled={editando}
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
            disabled={editando}
          />
        </div>
        <div className="form-group">
          <TextField
            label='Tipo de Servicio'
            type="text"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleInputChange}
            required
            fullWidth
            disabled={editando}
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
            disabled={editando}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            label='Técnico'
            type="text"
            name="tecnico"
            value={formData.tecnico}
            onChange={handleInputChange}
            select
            required
            disabled={editando}
            fullWidth
          >
            {tecnicos.map(tecnico => (
    <MenuItem key={tecnico.NombreEmpleado} value={tecnico.IdEmpleado}>
      {tecnico.NombreEmpleado}
    </MenuItem>
  ))}
          
          </TextField>
          
        </div>
        <div className="form-group">
          <TextField
            label='Precio'
            type="number"
            name="precioReparacion"
            value={formData.precioReparacion}
            onChange={handleInputChange}
            required
            disabled={editando}
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
            disabled={editando}
            fullWidth
          />
        </div>        
        <Button variant="contained" type="submit" fullWidth disabled={editando}>Registro</Button>
    </form>
    </Container>
  );
};


