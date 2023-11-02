import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalleServicio from './DetalleServicio';
import './FormularioReparacion.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



export default function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [numeroOrdenSeleccionado, setNumeroOrdenSeleccionado] = useState(null);

  const mostrarDetalleServicio = (numeroOrden) => {
    setNumeroOrdenSeleccionado(numeroOrden);
   };

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

  return (
    <TableContainer component={Paper}>
      <h1>Lista de Reparaciones</h1>
      <Button href='/formulario' variant="contained" color="success" sx={{mb:4}}>Nueva reparación</Button>    
   <Table>
      <TableHead >
          <TableRow >
            <TableCell>Número de Orden</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Tipo de Equipo</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Trabajo a Realizar</TableCell>
            <TableCell>Tipo de Servicio</TableCell>
            <TableCell>Fecha Recibido</TableCell>
            <TableCell>Fecha Finalizado</TableCell>
            <TableCell>Técnico</TableCell>
            <TableCell>Precio de Reparación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Nota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicios.map(servicio => (
            <TableRow key={servicio.NumeroOrden}>
              <TableCell >{servicio.NumeroOrden}</TableCell >
              <TableCell >{servicio.CICliente}</TableCell >
              <TableCell >{servicio.TipoEquipo}</TableCell >
              <TableCell >{servicio.Modelo}</TableCell >
              <TableCell >{servicio.TrabajoARealizar}</TableCell >
              <TableCell>{servicio.TipoServicio}</TableCell >
              <TableCell >{servicio.FechaRecibido}</TableCell >
              <TableCell >{servicio.FechaFinalizado}</TableCell >
              <TableCell >{servicio.Tecnico}</TableCell >
              <TableCell >{servicio.PrecioReparacion}</TableCell >
              <TableCell >{servicio.IdEstado}</TableCell >
              <TableCell >{servicio.Nota}</TableCell >
              <TableCell >
                <Button onClick={() => mostrarDetalleServicio(servicio.NumeroOrden)}>
                  Ver Detalles
                </Button>
              </TableCell >
            </TableRow>
          ))}
        </TableBody>
      </Table >

      {/* Renderiza el componente DetalleServicio si se ha seleccionado un número de orden */}
      {numeroOrdenSeleccionado && <DetalleServicio numeroOrden={numeroOrdenSeleccionado} />}
    </TableContainer>
  );
  
  
}








 


