import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contraloria = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/contraloria', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar contraloría", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos...</div>;

    return (
        <Layout moduleMode="contraloria">
            <div className="row">
                <div className="col-md-6 text-white">
                    {data.indicadores && data.indicadores.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
                <div className="col-md-6 text-white">
                    {data.reportes && data.reportes.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Contraloria;
