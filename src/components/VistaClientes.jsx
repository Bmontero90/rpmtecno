import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Container, IconButton, InputAdornment,Modal, OutlinedInput, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';




export default function VistaClientes() {
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tiposServicios, setTiposServicios] = useState([]);
  const [ordenBuscado, setOrdenBuscado] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apirpmtecnodeploy.azurewebsites.net/api/servicio');
        setServicios(response.data);

        const estadosResponse = await axios.get('https://apirpmtecnodeploy.azurewebsites.net/api/estadoservicio');
        setEstados(estadosResponse.data);

        const tiposSResponse = await axios.get('https://apirpmtecnodeploy.azurewebsites.net/api/tiposervicio');
        setTiposServicios(tiposSResponse.data);

        const tecnicosResponse = await axios.get('https://apirpmtecnodeploy.azurewebsites.net/api/empleado');
        setTecnicos(tecnicosResponse.data);


      } catch (error) {
        console.error('Error al obtener la lista de servicios y estados', error);
      }
    };

    fetchData();
  }, []);

  const buscarServicios = () => {
    let resultado = servicios;

    if (ordenBuscado) {
      resultado = resultado.filter(
        (dato) =>
          dato.NumeroOrden.toString().includes(ordenBuscado) ||
          dato.CICliente.toString().includes(ordenBuscado)
      );
    }

    return resultado;
  };
 
  const mostrarDetallesServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    handleOpen(); 
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


  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
    <TableContainer>
      <Container>
        <Box>
        <Typography variant='h4' sx={{ mb: 1,mt:4,textAlign:'center'}}>Consultá tu reparación</Typography>
        <Typography variant='h4' sx={{ mb: 2,textAlign:'center',fontSize:15}}>Consulte aquí el estado de su reparación, ingresando su número de orden o su número de cédula.</Typography>
        </Box>
        <OutlinedInput value={ordenBuscado}   onChange={(e) => setOrdenBuscado(e.target.value)}  placeholder="Buscar..." sx={{ mb: 2 }} fullWidth size="small"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          } />
              
        {ordenBuscado  && (
      <Table size="small" sx={{mb:2}}>
        <TableHead >
          <TableRow >
            <StyledTableCell>Número de Orden</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Trabajo a Realizar</StyledTableCell>
            <StyledTableCell>Fecha Recibido</StyledTableCell>
            <StyledTableCell>Técnico</StyledTableCell>
            <StyledTableCell>Tipo Servicio</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buscarServicios().map(servicio => (
            <StyledTableRow key={servicio.NumeroOrden}>
              <StyledTableCell >{servicio.NumeroOrden}</StyledTableCell >
              <StyledTableCell >{servicio.CICliente}</StyledTableCell >
              <StyledTableCell >{servicio.TrabajoARealizar}</StyledTableCell >
              <StyledTableCell >{servicio.FechaRecibido}</StyledTableCell >
              <StyledTableCell >{servicio.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicio.Tecnico)?.NombreEmpleado}</StyledTableCell >
              <StyledTableCell >{servicio.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicio.TipoServicio)?.NombreServicio}</StyledTableCell >
              <StyledTableCell>{servicio.IdEstado && estados.find((estado) => estado.IdEstado === servicio.IdEstado)?.Estado}</StyledTableCell>
              <StyledTableCell>
                <Box>
                  <IconButton onClick={() => mostrarDetallesServicio(servicio)}>
                    <SearchIcon sx={{ paddingRight: '2px' }} />
                  </IconButton>
                </Box>
              </StyledTableCell>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleModal}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Detalles de la Reparación
                  </Typography>
                  {servicioSeleccionado && (
                    <div>
                      <TextField label='Numero de Orden' defaultValue={servicioSeleccionado.NumeroOrden} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Cliente' defaultValue={servicioSeleccionado.CICliente} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Tipo de Equipo' defaultValue={servicioSeleccionado.TipoEquipo} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Modelo' defaultValue={servicioSeleccionado.Modelo} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Trabajo a Realizar' defaultValue={servicioSeleccionado.TrabajoARealizar} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20 }} />
                      <TextField label='Tipo de Servicio' defaultValue={servicioSeleccionado.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicioSeleccionado.TipoServicio)?.NombreServicio} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Fecha Recibido' defaultValue={servicioSeleccionado.FechaRecibido} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Fecha Finalizado' defaultValue={servicioSeleccionado.FechaFinalizado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Tecnico' defaultValue={servicioSeleccionado.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicioSeleccionado.Tecnico)?.NombreEmpleado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Precio: $' defaultValue={servicioSeleccionado.PrecioReparacion} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Estado' defaultValue={servicioSeleccionado.IdEstado && estados.find((estado) => estado.IdEstado === servicioSeleccionado.IdEstado)?.Estado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                    </div>
                  )}
                </Box>
              </Modal>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table >
      )}
      </Container>   
    </TableContainer>
    </>
  );
  
}
