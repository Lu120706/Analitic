import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const TIC = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tic', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar TIC", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos de TIC...</div>;

    return (
        <Layout moduleMode="tic">
            <div className="row text-white">
                <div className="col-md-12">
                    {data.servicios && data.servicios.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default TIC;
