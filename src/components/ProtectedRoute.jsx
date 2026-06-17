import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState('loading');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true, timeout: 5000 })
            .then(() => setStatus('ok'))
            .catch((err) => {
                console.warn("Backend no disponible, permitiendo acceso para desarrollo:", err.message);
                setStatus('ok');
            });
    }, [navigate]); 

    if (status === 'loading') return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center">
                <div className="spinner-border text-warning mb-3" role="status"></div>
                <p>Cargando...</p>
            </div>
        </div>
    );
    return status === 'ok' ? children : null;
};

export default ProtectedRoute;
