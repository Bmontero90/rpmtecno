import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Container, MenuItem, TextField } from '@mui/material';

export default function FormularioCliente() {
  const [garantias, setGarantias] = useState([]);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const [formData, setFormData] = useState({
    NumeroOrden : '',
    FechaInicio : formattedDate,   
    FechaFinal : '',
    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/garantia');
        setGarantias(response.data);
        console.log(garantias)
        
      } catch (error) {
        console.error('Error al obtener la lista de Garantias', error);
      }
    };

    fetchData();
  }, []); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
   
     
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { NumeroOrden, FechaInicio, FechaFinal} = formData;

    try {

      const response = await axios.post('http://localhost:62164/api/garantia', {
        NumeroOrden,
        FechaInicio,
        FechaFinal,
      });
      console.log(response);
      console.log('Garantia creada correctamente.');
      window.location.href = '/servicios';
    } catch (error) {
      console.error('Error :', error);
    }
  };



  return (
    <Container sx={{mt:5}}>
      <h2>Formulario de Garantia</h2>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">  
          <TextField 
          label='Nùmero de Orden'
          name='NumeroOrden'
          value={formData.NumeroOrden}
          onChange={handleInputChange}
          fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Fecha De Inicio'
            name="FechaInicio"
            value={formData.FechaInicio}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Fecha Final'
            name="FechaFinal"
            value={formData.FechaFinal}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
       
        <Button variant="contained" type="submit" >Crear</Button>     
      </form>
    </Container>
  );
};


