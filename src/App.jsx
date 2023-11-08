import './App.css';
import Navbar from './components/Navbar';
import ListaServicios1 from './components/ListaServicios';
import ListaClientes from './components/ListaClientes';
import FormularioReparacion from './components/FormularioReparacion';
import { Route, Routes } from 'react-router-dom';
import FormularioCliente from './components/FormularioCliente';


export default function App(){
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ListaServicios1/> } />
        <Route path='/formularioOrden' element={<FormularioReparacion/> } />
        <Route path='/clientes' element={<ListaClientes/> } />
        <Route path='/formularioCliente' element={<FormularioCliente/> } />
      </Routes>

    </div>
  );
}

