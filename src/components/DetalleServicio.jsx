import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Modal, TextField, Typography } from "@mui/material";


export default function DetalleServicio() {

  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mostrarDetallesServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    handleOpen(); 
  };

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


  return(
    <>
    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleModal}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Detalles de la Órden
                  </Typography>
                  {servicioSeleccionado && (
                    <div>
                      <TextField label='Numero de Orden' defaultValue={servicioSeleccionado.NumeroOrden} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Cliente' defaultValue={servicioSeleccionado.CICliente} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Tipo de Equipo' defaultValue={servicioSeleccionado.TipoEquipo} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Modelo' defaultValue={servicioSeleccionado.Modelo} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Trabajo a Realizar' defaultValue={servicioSeleccionado.TrabajoARealizar} size="small" variant="standard" sx={{ mr: 20 }} />
                      <TextField label='Tipo de Servicio' defaultValue={servicioSeleccionado.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicioSeleccionado.TipoServicio)?.NombreServicio} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Fecha Recibido' defaultValue={servicioSeleccionado.FechaRecibido} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Fecha Finalizado' defaultValue={servicioSeleccionado.FechaFinalizado} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Tecnico' defaultValue={servicioSeleccionado.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicioSeleccionado.Tecnico)?.NombreEmpleado} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Precio: $' defaultValue={servicioSeleccionado.PrecioReparacion} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Estado' defaultValue={servicioSeleccionado.IdEstado && estados.find((estado) => estado.IdEstado === servicioSeleccionado.IdEstado)?.Estado} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                    </div>
                  )}
                </Box>
              </Modal>

    </>
  )
}