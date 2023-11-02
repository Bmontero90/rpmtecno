import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getEmpleados } from '../services/Api';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:62164/api/empleado');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de empleados', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>Lista de Empleados</h1>
      <ul>
        {empleados.map(empleado => (
          <li key={empleado.IdEmpleado}>
            {empleado.NombreEmpleado} - Tipo de Servicio: {empleado.IdTipoServicio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEmpleados;
