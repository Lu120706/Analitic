import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Informes.css';

const ListaInformes = () => {
    const { nombre_empresa } = useParams();
    const [data, setData] = useState({ titulo: '', items: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/informes/${nombre_empresa}`, { withCredentials: true })
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando informes", err);
                setLoading(false);
            });
    }, [nombre_empresa]);

    if (loading) return <div className="text-dark text-center mt-5">Cargando...</div>;

    return (
        <Layout moduleMode="informes">
            <div className="container mt-2 text-dark" style={{ maxWidth: '800px', marginLeft: '5%', marginTop: '30px' }}>
                <h2 className="mb-5 text-dark">{data.titulo || `Informes de ${nombre_empresa}`}</h2>
                {data.items.length === 0 && <p>No hay informes disponibles.</p>}
                {data.items.map((item, i) => (
                    <div key={i} className="d-flex align-items-center mb-1 pb-1" style={{ height: '40px' }}>
                        <div style={{ flex: '0 0 500px', borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}>
                            <h5 className="mb-0">{item.nombre}</h5>
                        </div>
                        <div style={{ flex: '0 0 150px', textAlign: 'right', borderBottom: '0   px solid rgba(0, 0, 0, 0.2)' }}>
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn btn-outline-dark px-4 btn-sm fw-bold"
                                style={{ borderRadius: '4px', borderColor: '#000', color: '#000', marginBottom: '5px' }}
                            >
                                Ver informe
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default ListaInformes;
