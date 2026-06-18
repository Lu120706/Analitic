import React, { useState } from 'react';
import axios from 'axios';

const CrearNoticia = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        texto: '',
        modulo_destino: 'dashboard',
        link: '',
        fecha_expiracion: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append("seccion", formData.modulo_destino);
        data.append("titulo", formData.titulo);
        data.append("texto", formData.texto);
        data.append("link", formData.link);
        data.append("fecha_expiracion", formData.fecha_expiracion);

        try {
            await axios.post('http://127.0.0.1:5000/noticias', data, { 
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Noticia creada con éxito');
            setFormData({ titulo: '', texto: '', modulo_destino: 'dashboard', link: '', fecha_expiracion: '' });
            window.location.reload();
        } catch (err) {
            console.error('Error detallado:', err);
            alert('Error al crear la noticia.');
        }
    };

    return (
        <div style={{ backgroundColor: 'transparent', padding: '10px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
            <h5 className="text-center text-dark mb-2" style={{ fontSize: '0.9rem' }}>Crear nueva noticia</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="form-label" style={{ fontSize: '0.7rem', color: '#333', marginBottom: '0.1rem' }}>Sección</label>
                    <select className="form-control form-control-sm" style={{ fontSize: '0.75rem', height: '30px' }} value={formData.modulo_destino} onChange={e => setFormData({...formData, modulo_destino: e.target.value})}>
                        <option value="dashboard">General</option>
                        <option value="abastecimiento">Abastecimiento</option>
                        <option value="comercio">Comercio</option>
                        <option value="contabilidad">Contabilidad</option>
                        <option value="contraloria">Contraloría</option>
                        <option value="recursos_humanos">Recursos Humanos</option>
                        <option value="tesoreria">Tesorería</option>
                        <option value="tic">TIC</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label className="form-label" style={{ fontSize: '0.7rem', color: '#333', marginBottom: '0.1rem' }}>Título</label>
                    <input className="form-control form-control-sm" style={{ fontSize: '0.75rem', height: '30px' }} value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
                </div>
                <div className="mb-1">
                    <label className="form-label" style={{ fontSize: '0.7rem', color: '#333', marginBottom: '0.1rem' }}>Contenido</label>
                    <textarea className="form-control form-control-sm" style={{ fontSize: '0.75rem', height: '50px' }} rows="2" value={formData.texto} onChange={e => setFormData({...formData, texto: e.target.value})} required />
                </div>
                <div className="mb-1">
                    <label className="form-label" style={{ fontSize: '0.7rem', color: '#333', marginBottom: '0.1rem' }}>Link (Opcional)</label>
                    <input className="form-control form-control-sm" style={{ fontSize: '0.75rem', height: '30px' }} value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                </div>
                <div className="mb-2">
                    <label className="form-label" style={{ fontSize: '0.7rem', color: '#333', marginBottom: '0.1rem' }}>Fecha expiración</label>
                    <input type="date" className="form-control form-control-sm" style={{ fontSize: '0.75rem', height: '30px' }} value={formData.fecha_expiracion} onChange={e => setFormData({...formData, fecha_expiracion: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-dark btn-sm w-100" style={{ fontSize: '0.8rem', padding: '5px' }}>Crear</button>
            </form>
        </div>
    );
};

export default CrearNoticia;
