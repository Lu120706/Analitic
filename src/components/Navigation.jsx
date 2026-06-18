import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/Navigation.css';

const Navigation = ({ moduleMode = 'default' }) => {
    const [organizacion, setOrganizacion] = useState('');
    const [rol, setRol] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const empresaGuardada = localStorage.getItem('nombre_empresa');
        if (empresaGuardada) setOrganizacion(empresaGuardada);

        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true })
            .then(res => {
                setRol(res.data.rol || '');
            })
            .catch(err => console.error("Error al cargar dashboard:", err));
    }, []);

    // Removemos el console.log que causaba ruido
    const renderNavLinks = () => {
        if (moduleMode === 'contraloria') {
            return (
                <>
                    <Nav.Link as={Link} to="/contraloria/indicadores">Indicadores</Nav.Link>
                    <Nav.Link as={Link} to="/contraloria/reportes">Reportes</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'contabilidad') {
            return (
                <>
                    <Nav.Link as={Link} to="/contabilidad/auditoria">Auditoria</Nav.Link>
                    <Nav.Link as={Link} to="/contabilidad/nomina">Nomina</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'abastecimiento') {
            return (
                <>
                    <Nav.Link as={Link} to="/abastecimiento/campanas">Campañas</Nav.Link>
                    <Nav.Link as={Link} to="/abastecimiento/nomina">Nómina</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'comercio') {
            return (
                <>
                    <Nav.Link as={Link} to="/comercio/campanas">Campañas</Nav.Link>
                    <Nav.Link as={Link} to="/comercio/clientes">Clientes</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'recursos_humanos') {
            return (
                <>
                    <Nav.Link as={Link} to="/recursos_humanos/gestion">Gestión Documental</Nav.Link>
                    <Nav.Link as={Link} to="/recursos_humanos/seguridad">Seguridad y Salud</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'tesoreria') {
            return (
                <>
                    <Nav.Link as={Link} to="/tesoreria/reportes">Reportes</Nav.Link>
                </>
            );
        }

        if (moduleMode === 'tic') {
            return (
                <>
                    <Nav.Link as={Link} to="/tic/soporte">Soporte</Nav.Link>
                    <Nav.Link as={Link} to="/tic/estado">Estado Red</Nav.Link>
                </>
            );
        }

        return (
            <>
                <Nav.Link as={Link} to="/abastecimiento">Abastecimiento</Nav.Link>
                <Nav.Link as={Link} to="/comercio">Comercio</Nav.Link>
                <Nav.Link as={Link} to="/contabilidad">Contabilidad</Nav.Link>
                <Nav.Link as={Link} to="/contraloria">Contraloria</Nav.Link>
                <Nav.Link as={Link} to="/recursos_humanos">RRHH</Nav.Link>
                <Nav.Link as={Link} to="/tesoreria">Tesoreria</Nav.Link>
                <Nav.Link as={Link} to="/tic">TIC</Nav.Link>
            </>
        );
    };

    return (
        <Navbar expand="lg" sticky="top" className="mb-4 navbar-custom">
            <Container fluid>
                <div className="d-flex align-items-center">
                    <NavDropdown title="☰  " id="basic-nav-dropdown" className="me-2">    
                        <NavDropdown.Item as={Link} to="/informe/ventas">Ventas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/informe/financiero">Financiero</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/contabilidad">Contabilidad</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/corte-laminas">Corte de laminas</NavDropdown.Item>
                    </NavDropdown>
                    <Navbar.Brand as={Link} to="/dashboard" style={{ color: '#333', fontWeight: 'bold' }}>
                        {organizacion || 'ORGANIZACION GYJ'}
                    </Navbar.Brand>
                </div>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {renderNavLinks()}
                        <NavDropdown 
                            title={<img src="https://cdn.phototourl.com/free/2026-05-28-46de0ce8-53a3-4b0d-9a8b-582f91e091f6.png" alt="Perfil" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />} 
                            id="user-nav-dropdown" 
                            className="fw-bold" 
                            align="end"
                        >
                            {/* Noticias visible para todos */}
                            <NavDropdown.Item as={Link} to="/noticias">Noticias</NavDropdown.Item>

                            {/* Solo Admin ve las opciones de gestión */}
                            {rol === 'admin' && (
                                <>
                                    <NavDropdown.Item as={Link} to="/crear-noticia">Crear Noticia</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/comentarios">Comentarios</NavDropdown.Item>
                                </>
                            )}
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="text-danger fw-bold" onClick={() => window.location.href = '/login'}>Salir</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;

