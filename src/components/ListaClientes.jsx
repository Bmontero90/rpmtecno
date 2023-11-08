import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, InputBase, TextField} from '@mui/material';

export default function Clientes() {

const [clientes, setClientes] = useState([]);
const [clienteBuscado, setclienteBuscado] = useState('');

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/cliente');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de clientes', error);
      }
    };

    fetchData();
  }, []); 


  const buscador = (e) => {
    setclienteBuscado(e.target.value)
    console.log(e)
  }

  //Metodo de filtrado
    let resultado = []
    if(!clienteBuscado){
        resultado = clientes
    } else{
        resultado = clientes.filter((dato) =>
        dato.CI.toString().includes(clienteBuscado) ||
        dato.Nombre.toLowerCase().includes(clienteBuscado.toLocaleLowerCase()) ||
        dato.Apellido.toLowerCase().includes(clienteBuscado.toLowerCase())  ||
        dato.Telefono.toLowerCase().includes(clienteBuscado.toLowerCase())
        )
    }

    return(
        
        <TableContainer component={Paper}>
      <h1>Lista de Clientes</h1>
      <Button href='/formularioCliente' variant="contained" color="success" sx={{mb:4}}>Nuevo Cliente</Button>
      <TextField value={clienteBuscado} onChange={buscador} placeholder="Buscar..." fullWidth/>  
   <Table>
      <TableHead >
          <TableRow >
            <TableCell>Cédula</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>E-mail</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(cliente => (
            <TableRow key={cliente.CI}>
              <TableCell >{cliente.CI}</TableCell >
              <TableCell >{cliente.Nombre}</TableCell >
              <TableCell >{cliente.Apellido}</TableCell >
              <TableCell >{cliente.Telefono}</TableCell >
              <TableCell >{cliente.Mail}</TableCell >
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
       
    )
}
