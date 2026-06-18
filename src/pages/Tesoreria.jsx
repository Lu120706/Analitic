import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tesoreria = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tesoreria', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar tesorería", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos de Tesorería...</div>;

    return (
        <Layout moduleMode="tesoreria">
            <div className="row text-white">
                <div className="col-md-12">
                    {data.reportes && data.reportes.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tesoreria;

