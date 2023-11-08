import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalleServicio from './DetalleServicio';
import './FormularioReparacion.css';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';



export default function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [ordenBuscado, setOrdenBuscado] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/servicio');
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de empleados', error);
      }
    };

    fetchData();
  }, []);


  const buscador = (e) => {
    setOrdenBuscado(e.target.value)
    console.log(e)
  }

  //Metodo de filtrado
    let resultado = []
    if(!ordenBuscado){
        resultado = servicios
    } else{
        resultado = servicios.filter((dato) =>
        dato.NumeroOrden.toString().includes(ordenBuscado) ||
        dato.CICliente.toString().includes(ordenBuscado) ||
        dato.Tecnico.toLowerCase().includes(ordenBuscado.toLowerCase()) ||
        dato.FechaRecibido.toString().includes(ordenBuscado)
        )
    }

  return (
      <TableContainer component={Paper}>
      <h1>Lista de Reparaciones</h1>
      <Button href='/formularioOrden' variant="contained" color="success" sx={{mb:4}}>Nueva Orden</Button>
      <TextField value={ordenBuscado} onChange={buscador} placeholder="Buscar..." fullWidth/>    
   <Table>
      <TableHead >
          <TableRow >
            <TableCell>Número de Orden</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Trabajo a Realizar</TableCell>
            <TableCell>Fecha Recibido</TableCell>
            <TableCell>Técnico</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(servicio => (
            <TableRow key={servicio.NumeroOrden}>
              <TableCell >{servicio.NumeroOrden}</TableCell >
              <TableCell >{servicio.CICliente}</TableCell >
              <TableCell >{servicio.TrabajoARealizar}</TableCell >
              <TableCell >{servicio.FechaRecibido}</TableCell >
              <TableCell >{servicio.Tecnico}</TableCell >
              <TableCell >{servicio.IdEstado}</TableCell >
              <TableCell>
                <Box>
                  <EditIcon sx={{ paddingRight: '10px' }} />
                  <SearchIcon sx={{ paddingRight: '10px' }} />
                  <DeleteIcon />
                </Box>
              </TableCell>
              {/* <TableCell >
                <Button onClick={() => mostrarDetalleServicio(servicio.NumeroOrden)}>
                  Ver Detalles
                </Button>
              </TableCell > */}
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </TableContainer>
  );
  
  
}








 


