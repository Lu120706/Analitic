import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Abastecimiento = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/abastecimiento', { withCredentials: true })
            .then(res => {
                console.log("Datos recibidos:", res.data);
                setData(res.data);
            })
            .catch(err => {
                console.error("Error completo:", err);
                setError("Error al conectar con el servidor.");
            });
    }, []);

    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!data) return <div className="text-white text-center mt-5">Cargando datos...</div>;

    return (
        <Layout moduleMode="abastecimiento">
            <div className="dashboard-container">
                <div className="main-content">
                    <div className="row text-white">
                        <div className="col-md-6">
                            {data.campañas && data.campañas.map((item, i) => (
                                <p key={i} className="mb-2">{item}</p>
                            ))}
                        </div>
                        <div className="col-md-6">
                            {data.nomina && data.nomina.map((item, i) => (
                                <p key={i} className="mb-2">{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Abastecimiento;

