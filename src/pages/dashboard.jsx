import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import NoticiasModule from '../components/Noticias/NoticiasModule';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    // Force check
    useEffect(() => {
        console.log("Dashboard montado");
        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true })
            .then(res => {
                console.log("API RESPONDIÓ DASHBOARD:", res.data);
                setData(res.data);
            })
            .catch(err => {
                console.error("API FALLÓ:", err);
                navigate('/login');
            });
    }, [navigate]);

    if (!data) return <div className="text-center mt-5 text-white">Cargando dashboard...</div>;

    /*console.log("Búsqueda actual:", busqueda);
    console.log("Datos recibidos:", data);
    console.log("Informes buscador:", data.informes_buscador);*/
    
    const informesFiltrados = data.informes_buscador?.filter(inf => {
        const busquedaLower = busqueda.toLowerCase();
        const matchNombre = inf.nombre?.toLowerCase().includes(busquedaLower);
        const matchKeywords = inf.keywords?.some(k => k.toLowerCase().includes(busquedaLower));
       /* console.log(`Evaluando ${inf.nombre}:`, { matchNombre, matchKeywords });*/
        return matchNombre || matchKeywords;
    }) || [];
    /*console.log("Resultados filtrados:", informesFiltrados);*/
console.log("Renderizando Dashboard con datos:", data);
    return (
        <Layout>
            <div className="dashboard-container">
                <div className="main-content">
                    <NoticiasModule noticias={data.noticias} />

                    <div className="card-custom shadow">
                        <h5>Contacto TIC</h5>
                        <div className="row">
                            {data.contactos_tic?.map((c, i) => (
                                <div key={i} className="col-12 col-md-4 mb-3">
                                    <strong>{c.nombre}</strong><br />
                                    <small className="text-secondary">{c.rol}</small><br />
                                    <small>{c.email}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sidebar-right">
                    {/* Logo único en la parte derecha */}
                    <div className="d-flex justify-content-center mb-4">
                        {data.logos?.map((logo, i) => {
                            // Si el usuario es admin, mostramos el logo principal
                            // Si es usuario, mostramos SOLO si el nombre del logo coincide con su empresa
                            const esAdmin = data.empresa === 'Organizacion GYJ';
                            const esLogoCorrecto = esAdmin ? logo.nombre === 'GYJ Ferreterias' : logo.nombre === data.empresa;

                            if (esLogoCorrecto) {
                                return (
                                    <div key={i} className="d-flex flex-column align-items-center">
                                        <img 
                                            src={logo.url} 
                                            alt={logo.nombre} 
                                            style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60'; }} 
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className="search-wrapper" style={{ order: -1, marginBottom: '20px' }}>
                        <i className="bi bi-search search-icon"></i>
                        <input 
                            type="text" 
                            className="form-control search-input-field" 
                            placeholder="Buscar..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        {busqueda && (
                            <div className="search-results-dropdown">
                                {informesFiltrados.length > 0 ? (
                                    informesFiltrados.map((inf, i) => (
                                        <button 
                                            key={i} 
                                            className="list-group-item list-group-item-action search-result-item" 
                                            onClick={() => navigate(inf.url)}
                                        >
                                            {inf.nombre}
                                        </button>
                                    ))
                                ) : (
                                    <div className="no-results">Sin resultados</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
