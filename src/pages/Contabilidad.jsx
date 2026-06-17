import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contabilidad = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/contabilidad', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar contabilidad", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos...</div>;

    return (
        <Layout moduleMode="contabilidad">
            <div className="row">
                <div className="col-md-12 text-white">
                    {data.auditoria_hallazgos && data.auditoria_hallazgos.map((hallazgo, i) => (
                        <p key={i} className="mb-2">{hallazgo}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Contabilidad;
