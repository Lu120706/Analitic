import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Noticias = () => {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [backendDisponible, setBackendDisponible] = useState(false);

    const comentariosDemo = [
        { nombre_usuario: "Juan García", comentario: "Excelente portal de noticias, muy útil", respuesta: "Gracias por tu feedback" },
        { nombre_usuario: "María López", comentario: "Me gustaría ver más actualizaciones financieras", respuesta: null },
        { nombre_usuario: "Carlos Rodríguez", comentario: "El sistema es muy intuitivo", respuesta: "Nos alegra tu opinión" }
    ];

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                setCargando(true);
                setError(null);
                const res = await axios.get('http://localhost:5000/api/comentarios', { 
                    withCredentials: true,
                    timeout: 5000 
                });
                setComentarios(Array.isArray(res.data.comments) ? res.data.comments : []);
                setBackendDisponible(true);
            } catch (err) {
                console.warn("Backend no disponible, usando datos de demo", err.message);
                setError("Backend no disponible - mostrando comentarios de demostración");
                setComentarios(comentariosDemo);
                setBackendDisponible(false);
            } finally {
                setCargando(false);
            }
        };
        fetchComentarios();
    }, []);

    const enviarComentario = () => {
        if (!nuevoComentario.trim()) {
            alert("Por favor escribe un comentario");
            return;
        }

        if (!backendDisponible) {
            alert("No hay conexión con el servidor. Agrega comentarios cuando el backend esté disponible.");
            return;
        }

        axios.post('http://localhost:5000/api/comentarios', { comentario: nuevoComentario }, { 
            withCredentials: true,
            timeout: 5000 
        })
            .then(() => {
                setNuevoComentario("");
                alert("Comentario enviado exitosamente");
                // Recargar comentarios
                axios.get('http://localhost:5000/api/comentarios', { 
                    withCredentials: true,
                    timeout: 5000 
                })
                    .then(res => setComentarios(Array.isArray(res.data.comments) ? res.data.comments : []))
                    .catch(err => console.error("Error recargando comentarios", err));
            })
            .catch(err => {
                console.error("Error enviando comentario", err);
                alert("Error al enviar el comentario. Verifica la conexión con el servidor.");
            });
    };

    return (
        <Layout>
            <h2 className="mb-4">📰 Noticias y Comentarios</h2>
            
            {/* Formulario de comentario */}
            <div className="card bg-dark text-white p-4 mb-4" style={{ border: '2px solid #FFC107' }}>
                <h5 className="mb-3 text-warning">Deja tu comentario</h5>
                <textarea 
                    className="form-control bg-dark text-white" 
                    value={nuevoComentario} 
                    onChange={(e) => setNuevoComentario(e.target.value)} 
                    placeholder="Escribe tu comentario aquí..."
                    rows="4"
                    style={{ border: '1px solid #555' }}
                    disabled={!backendDisponible}
                />
                <button 
                    className="btn btn-warning mt-3 fw-bold" 
                    onClick={enviarComentario}
                    disabled={cargando || !backendDisponible}
                >
                    ✓ Publicar Comentario
                </button>
                {!backendDisponible && (
                    <small className="text-muted d-block mt-2">
                        💡 Para publicar comentarios, debes tener el servidor backend corriendo en puerto 5000
                    </small>
                )}
            </div>

            {/* Mensaje de error/info */}
            {error && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>ℹ️ Info:</strong> {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            {/* Estado de cargando */}
            {cargando ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-muted mt-3">Cargando comentarios...</p>
                </div>
            ) : (
                /* Listado de comentarios */
                <>
                    {Array.isArray(comentarios) && comentarios.length > 0 ? (
                        <div>
                            <h5 className="mb-3 text-info">💬 Comentarios ({comentarios.length})</h5>
                            {comentarios.map((c, i) => (
                                <div key={i} className="card bg-dark text-white mb-3" style={{ border: '1px solid #444' }}>
                                    <div className="card-body">
                                        <h6 className="text-warning mb-2">👤 {c?.nombre_usuario || "Usuario Anónimo"}</h6>
                                        <p className="mb-2">{c?.comentario || "Sin contenido"}</p>
                                        {c?.respuesta && (
                                            <div className="mt-3 p-3 bg-secondary rounded border-left border-info">
                                                <small className="text-info"><strong>💬 Respuesta del Admin:</strong></small>
                                                <p className="mb-0 mt-2">{c.respuesta}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info text-center py-5">
                            <h5>📭 Sin comentarios aún</h5>
                            <p className="mb-0">Sé el primero en dejar un comentario</p>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};
export default Noticias;