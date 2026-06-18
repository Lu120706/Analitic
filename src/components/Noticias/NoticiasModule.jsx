import React from 'react';

const NoticiaCard = ({ noticia }) => {
    return (
        <div className="mb-3 border-bottom border-light pb-2 text-white">
            <h6 className="text-warning mb-1"><strong>{noticia.titulo}</strong></h6>
            <p className="mb-1 text-white" style={{ fontSize: '0.9rem' }}>{noticia.texto}</p>
            {noticia.link && (
                <a 
                    href={noticia.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-sm btn-outline-info mt-1"
                >
                    Ver más
                </a>
            )}
            {noticia.fecha && (
                <small className="text-secondary d-block mt-2">Publicado: {noticia.fecha}</small>
            )}
        </div>
    );
};

const NoticiasModule = ({ noticias = [] }) => {
    if (!noticias || noticias.length === 0) return null;

    return (
        <div className="card-custom mb-4 shadow">
            <h5 className="text-white mb-3">Noticias</h5>
            <div className="noticias-list">
                {noticias.map((noticia, i) => (
                    <NoticiaCard key={i} noticia={noticia} />
                ))}
            </div>
        </div>
    );
};

export default NoticiasModule;
