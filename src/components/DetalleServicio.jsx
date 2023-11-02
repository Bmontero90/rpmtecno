import React, { useState, useEffect } from 'react';
import axios from 'axios';



const DetalleServicio = ({ numeroOrden }) => {
    const [servicio, setServicio] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(numeroOrden);
            const response = await axios.get(`http://localhost:62164/api/servicio/${numeroOrden}`);
            setServicio(response.data);
            console.log(servicio);
          
          } catch (error) {
            
            console.error('Error al obtener detalle de servicio', error);
            
          }
        };
        fetchData();
      }, []);   

  return (
    <div>
      <h2>Detalles del Servicio {numeroOrden}</h2>
      <table>
      <thead>
          <tr>
            <th>Número de Orden</th>
            <th>Cliente</th>
            <th>Tipo de Equipo</th>
            <th>Modelo</th>
            <th>Trabajo a Realizar</th>
            <th>Tipo de Servicio</th>
            <th>Fecha Recibido</th>
            <th>Fecha Finalizado</th>
            <th>Técnico</th>
            <th>Precio de Reparación</th>
            <th>Estado</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          
            <tr key={servicio.NumeroOrden}>
              <td>{servicio.NumeroOrden}</td>
              <td>{servicio.CICliente}</td>
              <td>{servicio.TipoEquipo}</td>
              <td>{servicio.Modelo}</td>
              <td>{servicio.TrabajoARealizar}</td>
              <td>{servicio.TipoServicio}</td>
              <td>{servicio.FechaRecibido}</td>
              <td>{servicio.FechaFinalizado}</td>
              <td>{servicio.Tecnico}</td>
              <td>{servicio.PrecioReparacion}</td>
              <td>{servicio.IdEstado}</td>
              <td>{servicio.Nota}</td>
            </tr>
          ))
        </tbody>
      </table>
    </div>
  );
};

export default DetalleServicio;
