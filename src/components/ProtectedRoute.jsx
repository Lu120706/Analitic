import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const [status, setStatus] = useState('loading');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true, timeout: 5000 })
            .then((res) => {
                const role = res.data?.rol || localStorage.getItem('usuario_rol') || '';
                setUserRole(role);
                
                // Verificar si el usuario tiene el rol requerido
                if (requiredRole && role !== requiredRole) {
                    setStatus('forbidden');
                } else {
                    setStatus('ok');
                }
            })
            .catch((err) => {
                console.warn("Backend no disponible, permitiendo acceso para desarrollo:", err.message);
                setStatus('ok');
            });
    }, [requiredRole]); 

    if (status === 'loading') return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center">
                <div className="spinner-border text-warning mb-3" role="status"></div>
                <p>Cargando...</p>
            </div>
        </div>
    );

    if (status === 'forbidden') return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center">
                <h2>Acceso Denegado</h2>
                <p>No tienes permiso para acceder a esta página.</p>
                <button 
                    className="btn btn-warning mt-3" 
                    onClick={() => navigate('/dashboard')}
                >
                    Volver al Dashboard
                </button>
            </div>
        </div>
    );

    return status === 'ok' ? children : null;
};

export default ProtectedRoute;

