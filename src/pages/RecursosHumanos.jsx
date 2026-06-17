import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecursosHumanos = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/recursos_humanos', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar RRHH", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos...</div>;

    return (
        <Layout moduleMode="recursos_humanos">
            <div className="row text-white">
                <div className="col-md-6">
                    {data.gestion_documental && data.gestion_documental.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
                <div className="col-md-6">
                    {data.seguridad_salud && data.seguridad_salud.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default RecursosHumanos;
