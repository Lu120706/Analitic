import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

const Departamento = () => {
    const { nombre } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/departamento/${nombre}`, { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar departamento", err));
    }, [nombre]);

    if (!data) return <div className="text-white">Cargando...</div>;

    return (
        <Layout>
            <h1 className="text-warning">{data.seccion.toUpperCase()}</h1>
            <h5 className="text-info mt-4">Noticias de {data.seccion}:</h5>
            {data.noticias && data.noticias.length > 0 ? (
                data.noticias.map((n, i) => (
                    <div key={i} className="card bg-dark text-white mb-2" style={{ border: '1px solid #333' }}>
                        <div className="card-body">
                            <h6>{n.titulo}</h6>
                            <p>{n.texto}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay noticias para esta sección.</p>
            )}
        </Layout>
    );
};

export default Departamento;
