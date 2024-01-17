import './App.css';
import Navbar from './components/Navbar';
import ListaServicios from './components/ListaServicios';
import ListaClientes from './components/ListaClientes';
import FormularioReparacion from './components/FormularioReparacion';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import FormularioCliente from './components/FormularioCliente';
import DetalleServicio from './components/DetalleServicio';
import DetalleGarantia from './components/DetalleGarantia';
import ListaGarantias from './components/ListaGarantias';
import Login from './components/Login';



export default function App(){

  

  const { isAuthenticated} = useAuth();
  return (
    <AuthProvider>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ProtectedRoute element={<ListaServicios />} />}/>
        <Route path='/formularioOrden'element={<ProtectedRoute element={<FormularioReparacion />} />}/>  
        <Route path="/clientes" element={<ProtectedRoute element={<ListaClientes />} />}/>        <Route path='/formularioCliente' element={<FormularioCliente/> } />
        <Route path='/detalleServicio/:NumeroOrden' element={<ProtectedRoute element={<DetalleServicio />} />} />
        <Route path='/detalleGarantia' element={<ProtectedRoute element={<DetalleGarantia />} />}/>
        <Route path='/listaGarantias' element={<ProtectedRoute element={<ListaGarantias />} />}/>
        <Route path='/login' element={<Login/> } />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>     
    </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  // Renderiza el componente solo si está autenticado, de lo contrario, redirige a /login
  return isAuthenticated ? element : <Navigate to="/login" />;
}

