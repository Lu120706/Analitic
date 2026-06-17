import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import '../styles/Dashboard.css';

const Layout = ({ children, moduleMode = 'default' }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error cargando datos globales del layout", err));
    }, []);

    return (
        <div style={{ 
            backgroundColor: '#1c1c1c',
            minHeight: '100vh', 
            color: 'white',
            backgroundImage: 'url("https://i.postimg.cc/zBq4wWCg/Gemini-Generated-Image-estpntestpntestp.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
        }}>
            <div style={{ backgroundColor: 'rgba(110, 109, 109, 0.25)', minHeight: '100vh' }}>
                <Navigation moduleMode={moduleMode} />
                <div className="container-fluid pt-3">
                        {moduleMode !== 'informes' && data && (
                            <div className="d-flex justify-content-center mb-4" style={{ color: 'black', width: '100%' }}>
                                <h5>{data.saludo}, {data.nombre_usuario}</h5>
                            </div>
                        )}
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            {children}
                        </div>
                        {moduleMode !== 'default' && moduleMode !== 'informes' && data?.logos && (
                            <div className="sidebar-right" style={{ marginTop: '20px', paddingRight: '40px' }}>
                                {data.logos.map((logo, i) => (
                                    <button 
                                        key={i} 
                                        className="logo-button"
                                        style={{ background: 'none', border: 'none', padding: '10px 0', display: 'block' }}
                                    >
                                        <img 
                                            src={logo.url} 
                                            alt={logo.nombre} 
                                            className="sidebar-logo-item" 
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Layout;