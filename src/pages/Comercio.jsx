import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Comercio = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/comercio', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error al cargar comercio", err));
    }, []);

    if (!data) return <div className="text-white text-center mt-5">Cargando datos...</div>;

    return (
        <Layout moduleMode="comercio">
            <div className="row text-white">
                <div className="col-md-6">
                    {data.campañas && data.campañas.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
                <div className="col-md-6">
                    {data.clientes && data.clientes.map((item, i) => (
                        <p key={i} className="mb-2">{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Comercio;

