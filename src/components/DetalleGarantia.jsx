import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container, MenuItem, TextField } from '@mui/material';

export default function DetalleGarantia() {
  const { NumeroOrden } = useParams();
  const [detalleGarantia, setDetalleGarantia] = useState(null);
  const [formulario, setFormulario] = useState({
    Meses: ''
   
  });
 

  useEffect(() => {
    const fetchDetalleGarantia = async () => {
      try {
        const response = await axios.get(`http://localhost:62164/api/garantia/${NumeroOrden}`);
        setDetalleGarantia(response.data);
        // También actualiza el estado del formulario con los datos del cliente
        setFormulario(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error al obtener los detalles del servicio', error);
      }
    };
 
    if (NumeroOrden) {
        fetchDetalleGarantia();
    }
  }, [NumeroOrden]);

const handleSubmit = async (e) => {
        e.preventDefault();
      
        const {
            Meses
        } = formData;
      
        try {
          const response = await axios.post('http://localhost:62164/api/garantia', {
            Meses
          });
          console.log(response);
          console.log('Reparación registrada correctamente.');
          window.location.href = '/servicios';
          
        } catch (error) {
          console.error('Error al registrar la reparación:', error);
        }
      };

    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormulario((prevFormulario) => ({
    //       ...prevFormulario,
    //       [name]: value,
    //     }));
    //   };
      

    return(
        <>
        <h1>Detalles Garantia</h1>
        <Container>
          <TextField
            label='Meses de la Garantía'
            name="Meses"
            value={formulario.Meses}
            required
            fullWidth
            select
            helperText="Por favor, seleccione cantidad de meses de la garantía"
          >
          <MenuItem value='6'>
            6
          </MenuItem>
          <MenuItem value='12'>
            12
          </MenuItem>
          </TextField>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
         
        </Container>
    
      </>
    )
}


  