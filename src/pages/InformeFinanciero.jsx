import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const InformeFinanciero = () => {
    const [data, setData] = useState({ items: [] });

    useEffect(() => {
        axios.get('http://localhost:5000/informe/financiero', { withCredentials: true })
            .then(res => setData(res.data))
            .catch(err => console.error("Error cargando financiero", err));
    }, []);

    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <Navigation />
            <div className="container mt-4">
                <h2 className="text-white mb-4">{data.titulo}</h2>
                {data.items.map((item, i) => (
                    <div key={i} className="card bg-dark text-white mb-3 shadow" style={{ border: '1px solid #333' }}>
                        <div className="card-body">
                            <h5 className="card-title text-info">{item.rubro}</h5>
                            <p className="card-text h4"><strong>{item.valor}</strong></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InformeFinanciero;
