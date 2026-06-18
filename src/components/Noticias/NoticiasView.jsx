import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import NoticiasModule from './NoticiasModule';
import CrearNoticiaForm from './CrearNoticia';

const Noticias = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/dashboard', { withCredentials: true })
            .then(res => {
                console.log("DEBUG: Rol recibido del backend:", res.data?.rol);
                setData(res.data);
            })
            .catch(err => console.error("Error cargando perfil", err));
    }, []);

    return (
        <Layout>
            <div className="container mt-4">
                {/* Visualización de noticias para todos */}
                <NoticiasModule noticias={data?.noticias || []} />
                
                {/* El formulario aparece siempre para depurar */}
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <div style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        padding: '25px', 
                        borderRadius: '15px', 
                        backdropFilter: 'blur(5px)',
                        width: '600px'
                    }}>
                        <CrearNoticiaForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Noticias;