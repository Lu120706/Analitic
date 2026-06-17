import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
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
                console.log("API RESPONDIÓ:", res.data);
                setData(res.data);
            })
            .catch(err => {
                console.error("API FALLÓ:", err);
                navigate('/login');
            });
    }, [navigate]);

    if (!data) return <div className="text-center mt-5 text-white">Cargando dashboard...</div>;

    console.log("Búsqueda actual:", busqueda);
    console.log("Datos recibidos:", data);
    console.log("Informes buscador:", data.informes_buscador);
    
    const informesFiltrados = data.informes_buscador?.filter(inf => {
        const busquedaLower = busqueda.toLowerCase();
        const matchNombre = inf.nombre?.toLowerCase().includes(busquedaLower);
        const matchKeywords = inf.keywords?.some(k => k.toLowerCase().includes(busquedaLower));
        console.log(`Evaluando ${inf.nombre}:`, { matchNombre, matchKeywords });
        return matchNombre || matchKeywords;
    }) || [];
    console.log("Resultados filtrados:", informesFiltrados);

    return (
        <Layout>
            <div className="dashboard-container">
                <div className="main-content">
                    {data.noticias && data.noticias.length > 0 && (
                        <div className="card-custom mb-4 shadow">
                            <h6 className="text-dark mb-3">Noticias Generales</h6>
                            {data.noticias.map((noticia, i) => (
                                <div key={i} className="mb-3 border-bottom border-dark pb-2">
                                    <strong>{noticia.titulo}</strong>
                                    <p className="mb-1">{noticia.texto}</p>
                                    {noticia.link && <a href={noticia.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark">Ver más</a>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="card-custom shadow">
                        <h5>Contacto TIC</h5>
                        <div className="row">
                            {data.contactos_tic.map((c, i) => (
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
                    <div className="search-wrapper">
                        <i className="bi bi-search search-icon"></i>
                        <input 
                            type="text" 
                            className="form-control search-input-field" 
                            placeholder="Buscar..." 
                            value={busqueda}
                            onChange={(e) => {
                                console.log("Cambio detectado:", e.target.value);
                                setBusqueda(e.target.value);
                            }}
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

                    {data.logos && data.logos.length > 0 && data.logos.map((logo, i) => (
                        <button 
                            key={i} 
                            onClick={() => navigate(`/informes/${logo.nombre}`)} 
                            className="logo-button"
                            style={{ background: 'none', border: 'none', padding: 0 }}
                        >
                            <img src={logo.url} alt={logo.nombre} className="logo-item" style={{ marginLeft: '0' }} />
                        </button>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;