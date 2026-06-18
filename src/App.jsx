import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import InformeVentas from './pages/InformeVentas';
import InformeFinanciero from './pages/InformeFinanciero';
import Departamento from './pages/Departamento';
import Contabilidad from './pages/Contabilidad';
import Contraloria from './pages/Contraloria';
import Abastecimiento from './pages/Abastecimiento';
import Comercio from './pages/Comercio';
import RecursosHumanos from './pages/RecursosHumanos';
import Tesoreria from './pages/Tesoreria';
import TIC from './pages/TIC';
import ListaInformes from './pages/ListaInformes';
import Noticias from './components/Noticias/NoticiasView';
import CrearNoticia from './components/Noticias/CrearNoticia';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/informe/ventas" element={
          <ProtectedRoute>
            <InformeVentas />
          </ProtectedRoute>
        } />
        <Route path="/informe/financiero" element={
          <ProtectedRoute>
            <InformeFinanciero />
          </ProtectedRoute>
        } />
        <Route path="/contabilidad" element={
          <ProtectedRoute>
            <Contabilidad />
          </ProtectedRoute>
        } />
        <Route path="/contraloria" element={
          <ProtectedRoute>
            <Contraloria />
          </ProtectedRoute>
        } />
        <Route path="/abastecimiento" element={
          <ProtectedRoute>
            <Abastecimiento />
          </ProtectedRoute>
        } />
        <Route path="/comercio" element={
          <ProtectedRoute>
            <Comercio />
          </ProtectedRoute>
        } />
        <Route path="/recursos_humanos" element={
          <ProtectedRoute>
            <RecursosHumanos />
          </ProtectedRoute>
        } />
        <Route path="/tesoreria" element={
          <ProtectedRoute>
            <Tesoreria />
          </ProtectedRoute>
        } />
        <Route path="/tic" element={
          <ProtectedRoute>
            <TIC />
          </ProtectedRoute>
        } />
        <Route path="/informes/:nombre_empresa" element={
          <ProtectedRoute>
            <ListaInformes />
          </ProtectedRoute>
        } />
        <Route path="/departamento/:nombre" element={
          <ProtectedRoute>
            <Departamento />
          </ProtectedRoute>
        } />
        <Route path="/noticias" element={
          <ProtectedRoute requiredRole="admin">
            <Noticias />
          </ProtectedRoute>
        } />
        <Route path="/crear-noticia" element={
          <ProtectedRoute requiredRole="admin">
            <CrearNoticia />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
