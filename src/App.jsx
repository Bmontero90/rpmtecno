import './App.css';
import Navbar from './components/Navbar';
import ListaServicios from './components/ListaServicios';
import FormularioReparacion from './components/FormularioReparacion';
import { Route, Routes } from 'react-router-dom';


export default function App(){
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ListaServicios/> } />
        <Route path='/formulario' element={<FormularioReparacion/> } />
      </Routes>

    </div>
  );
}

