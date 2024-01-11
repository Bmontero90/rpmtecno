import './App.css';
import Navbar from './components/Navbar';
import ListaServicios from './components/ListaServicios';
import ListaClientes from './components/ListaClientes';
import FormularioReparacion from './components/FormularioReparacion';
import { Route, Routes } from 'react-router-dom';
import FormularioCliente from './components/FormularioCliente';
import DetalleServicio from './components/DetalleServicio';
import DetalleGarantia from './components/DetalleGarantia';
import ListaGarantias from './components/ListaGarantias';
import Login from './components/Login';


export default function App(){
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ListaServicios/> } />
        <Route path='/formularioOrden' element={<FormularioReparacion/> } />
        <Route path='/clientes' element={<ListaClientes/> } />
        <Route path='/formularioCliente' element={<FormularioCliente/> } />
        <Route path='/detalleServicio/:NumeroOrden' element={<DetalleServicio/> } />
        <Route path='/detalleGarantia' element={<DetalleGarantia/> } />
        <Route path='/listaGarantias' element={<ListaGarantias/> } />
        <Route path='/login' element={<Login/> } />
      </Routes>
      

    </div>
  );
}

