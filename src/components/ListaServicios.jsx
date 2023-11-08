import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './FormularioReparacion.css';
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
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

    const handleDelete = (NumeroOrden) => {
      if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
        axios
          .delete(`http://localhost:62164/api/servicio/${NumeroOrden}`)
          .then((response) => {
            console.log("Registro eliminado con éxito.");
            setServicios(servicios.filter(servicio => servicio.NumeroOrden !== NumeroOrden));
          })
          .catch((error) => {
            console.error("Error al eliminar el registro:", error);
          });
      }
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    

  return (
      <TableContainer component={Paper}>
      <h1>Lista de Reparaciones</h1>
      <Button href='/formularioOrden' variant="contained" color="success" sx={{mb:4}}>Nueva Orden</Button>
      <OutlinedInput value={ordenBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:4}} fullWidth size="small"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }/>    
   <Table size="small">
      <TableHead >
          <TableRow >
            <StyledTableCell>Número de Orden</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Trabajo a Realizar</StyledTableCell>
            <StyledTableCell>Fecha Recibido</StyledTableCell>
            <StyledTableCell>Técnico</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(servicio => (
            <StyledTableRow  key={servicio.NumeroOrden}>
              <StyledTableCell >{servicio.NumeroOrden}</StyledTableCell >
              <StyledTableCell >{servicio.CICliente}</StyledTableCell >
              <StyledTableCell >{servicio.TrabajoARealizar}</StyledTableCell >
              <StyledTableCell >{servicio.FechaRecibido}</StyledTableCell >
              <StyledTableCell >{servicio.Tecnico}</StyledTableCell >
              <StyledTableCell >{servicio.IdEstado}</StyledTableCell >
              <StyledTableCell>
                <Box>
                  <EditIcon sx={{ paddingRight: '10px' }} />
                  <SearchIcon sx={{ paddingRight: '10px' }} />
                  <IconButton onClick={() => handleDelete(servicio.NumeroOrden)}><DeleteIcon /></IconButton>                  
                </Box>
              </StyledTableCell>
              {/* <TableCell >
                <Button onClick={() => mostrarDetalleServicio(servicio.NumeroOrden)}>
                  Ver Detalles
                </Button>
              </TableCell > */}
            </StyledTableRow >
          ))}
        </TableBody>
      </Table >
    </TableContainer>
  );
  
  
}








 


