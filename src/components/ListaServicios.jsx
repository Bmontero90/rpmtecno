import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import './FormularioReparacion.css';
import { Box, Button, Container, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';



export default function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tiposServicios, setTiposServicios] = useState([]);
  const [ordenBuscado, setOrdenBuscado] = useState('');
  const [tipoServicioFiltrado, setTipoServicioFiltrado] = useState('');
  const [fechaRecibidoFiltrado, setFechaRecibidoFiltrado] = useState('');
  const [estadoFiltrado, setEstadoFiltrado] = useState('');
  const [tecnicoFiltrado, setTecnicoFiltrado] = useState('');
  
  
  //######################Probando edición de estado#################################
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [estadoEditando, setEstadoEditando] = useState('');

  const handleEditEstado = async (id, nuevoEstado) => {
    try {
      const data = {
        NumeroOrden: id,
        IdEstado: nuevoEstado,
      };
  
      await axios.put(`http://localhost:62164/api/servicio/${id}`, data);
  
      // Actualizar el estado local de servicios después de la actualización
      setServicios((prevServicios) => {
        return prevServicios.map((servicio) =>
          servicio.NumeroOrden === id
            ? { ...servicio, IdEstado: nuevoEstado }
            : servicio
        );
      });
    } catch (error) {
      console.error('Error al guardar el estado:', error);
    }
  };

  
  
//############################### Termino prueba update estado#################################
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/servicio');
        setServicios(response.data);

        const estadosResponse = await axios.get('http://localhost:62164/api/estadoservicio');
        setEstados(estadosResponse.data);

        const tiposSResponse = await axios.get('http://localhost:62164/api/tiposervicio');
        setTiposServicios(tiposSResponse.data);

        const tecnicosResponse = await axios.get('http://localhost:62164/api/empleado');
        setTecnicos(tecnicosResponse.data);
       
      } catch (error) {
        console.error('Error al obtener la lista de servicios y estados', error);
      }
    };

    fetchData();
  }, []);


  const buscador = (e) => {
    setOrdenBuscado(e.target.value)
    console.log(e)
  }

  const filtroTipoServicio = (e) => {
    setTipoServicioFiltrado(e.target.value);
  };

  const filtroFechaRecibido = (e) => {
    setFechaRecibidoFiltrado(e.target.value);
  };

  const filtroEstado = (e) => {
    setEstadoFiltrado(e.target.value);
  };

  const filtroTecnico = (e) => {
    setTecnicoFiltrado(e.target.value);
  };

  //Metodos de filtrado
    let resultado = []
    if(!ordenBuscado){
        resultado = servicios
    } else{
        resultado = servicios.filter((dato) =>
        dato.NumeroOrden.toString().includes(ordenBuscado) ||
        dato.CICliente.toString().includes(ordenBuscado)
        
        )
    }

    if (tipoServicioFiltrado) {
      resultado = resultado.filter((dato) => dato.TipoServicio && tiposServicios.find((tipo) => tipo.IdTipoServicio === dato.TipoServicio)?.NombreServicio === tipoServicioFiltrado);
    }

    if (fechaRecibidoFiltrado) {
      resultado = resultado.filter((dato) => dato.FechaRecibido === fechaRecibidoFiltrado);
    }

    if (estadoFiltrado) {
      resultado = resultado.filter((dato) => dato.IdEstado && estados.find((estado) => estado.IdEstado === dato.IdEstado)?.Estado === estadoFiltrado);
    }

    if (tecnicoFiltrado) {
      resultado = resultado.filter((dato) => dato.Tecnico && tecnicos.find((tecnico) => tecnico.IdEmpleado === dato.Tecnico)?.NombreEmpleado === tecnicoFiltrado);
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
        <Container>
      <Typography variant='h4' sx={{mb:2}}>Listado de Reparaciones</Typography>
      <Button href='/formularioOrden' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{mb:2}}>Añadir</Button>
      {/* <IconButton href='/formularioOrden'><NoteAddIcon color="success" fontSize="large" /></IconButton> */}
      {/* <Button href='/formularioOrden' variant="contained" color="success" sx={{mb:2}}>Nueva Orden</Button> */}
      <OutlinedInput value={ordenBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:2}} fullWidth size="small"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }/>
      <Grid container spacing={2}>
  <Grid item xs={3}>
    <TextField
            sx={{mb:4}}
            label='Tipo de Reparación'
            type="text"
            name="NombreServicio"
            size="small"
            fullWidth
            select
            value={tipoServicioFiltrado}
            onChange={filtroTipoServicio}
          >
          <MenuItem>
            Todos
          </MenuItem>
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
  </Grid>  
  <Grid item xs={3}>
  <TextField
            sx={{mb:4}}
            label='Estado'
            type="text"
            name="IdEstado"
            size="small"
            fullWidth
            select
            value={estadoFiltrado}
            onChange={filtroEstado}
          >
          <MenuItem>
            Todos
          </MenuItem>
          <MenuItem value='Ingresado'>
          Ingresado
          </MenuItem>
          <MenuItem value='En proceso de reparación'>
          En proceso de reparación
          </MenuItem>
          <MenuItem value='Esperando repuesto'>
          Esperando repuesto
          </MenuItem>
          <MenuItem value='Reparación finalizada'>
          Reparación finalizada
          </MenuItem>
          </TextField>
  </Grid>
  <Grid item xs={3}>
  <TextField
            sx={{mb:4}}
            label='Técnico'
            type="text"
            name="Tecnico"
            size="small"
            fullWidth
            select
            value={tecnicoFiltrado}
            onChange={filtroTecnico}
          >
          <MenuItem>
            Todos
          </MenuItem>
          <MenuItem value='Reparador de PC'>
          Reparador de PC
          </MenuItem>
          <MenuItem value='Reparador de celular'>
          Reparador de celular
          </MenuItem>
          <MenuItem value='Reparador de impresoras'>
          Reparador de impresoras
          </MenuItem>
          </TextField>
    </Grid>
    <Grid item xs={3}>
    <TextField
            sx={{mb:2}}
            label='Fecha de Entrega'
            type="date"
            name="fechaRecibido"
            value={fechaRecibidoFiltrado}
            onChange={filtroFechaRecibido}
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />  
  </Grid> 
</Grid>
      
</Container>
          
   <Table size="small">
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
          {resultado.map(servicio => (
            <StyledTableRow  key={servicio.NumeroOrden}>
              <StyledTableCell >{servicio.NumeroOrden}</StyledTableCell >
              <StyledTableCell >{servicio.CICliente}</StyledTableCell >
              <StyledTableCell >{servicio.TrabajoARealizar}</StyledTableCell >
              <StyledTableCell >{servicio.FechaRecibido}</StyledTableCell >
              <StyledTableCell >{servicio.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicio.Tecnico)?.NombreEmpleado}</StyledTableCell >
              <StyledTableCell >{servicio.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicio.TipoServicio)?.NombreServicio}</StyledTableCell >
              {/* <StyledTableCell >{servicio.IdEstado && estados.find((estado) => estado.IdEstado === servicio.IdEstado)?.Estado}</StyledTableCell > */}
              {/* <StyledTableCell>
  {servicio.NumeroOrden === estadoEditando ? (
    <>
      <TextField
        type="text"
        value={nuevoEstado}
        onChange={(e) => setNuevoEstado(e.target.value)}
      />
      <IconButton onClick={() => handleSaveEstado(servicio.NumeroOrden)}>
  <SaveIcon />
</IconButton>
      <IconButton onClick={() => setEstadoEditando('')}>
        <CancelIcon />
      </IconButton>
    </>
  ) : (
    <>
      {servicio.IdEstado &&
        estados.find((estado) => estado.IdEstado === servicio.IdEstado)?.Estado}
      <IconButton onClick={() => handleEditEstado(servicio.NumeroOrden)}>
        <EditIcon />
      </IconButton>
    </>
  )}
</StyledTableCell> */}

<StyledTableCell>
<Select size="small"
  value={servicio.IdEstado}
  onChange={(e) => handleEditEstado(servicio.NumeroOrden, e.target.value)}
>
  {estados.map((estado) => (
    <MenuItem key={estado.IdEstado} value={estado.IdEstado}>
      {estado.Estado}
    </MenuItem>
  ))}
</Select>
</StyledTableCell>

<StyledTableCell>
  <Box>
    <IconButton>
      <SearchIcon sx={{ paddingRight: '10px' }} />
    </IconButton>
    <IconButton onClick={() => handleDelete(servicio.NumeroOrden)}>
      <DeleteIcon />
    </IconButton>
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








 


