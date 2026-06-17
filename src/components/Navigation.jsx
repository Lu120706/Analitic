import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/Navigation.css';

const Navigation = ({ moduleMode = 'default' }) => {
    const [organizacion, setOrganizacion] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/dashboard', { withCredentials: true })
            .then(res => {
                if (res.data) {
                    const nombreEmpresa = res.data.empresa || 'ORGANIZACION GYJ';
                    setOrganizacion(nombreEmpresa);
                    localStorage.setItem('nombre_empresa', nombreEmpresa);
                }
            })
            .catch(err => console.error("Error al cargar organización:", err));
    }, []);

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
                    <Nav.Link as={Link} to="/contabilidad/auditoria">Auditoría</Nav.Link>
                    <Nav.Link as={Link} to="/contabilidad/nomina">Nómina</Nav.Link>
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
                <Nav.Link as={Link} to="/contraloria">Contraloría</Nav.Link>
                <Nav.Link as={Link} to="/recursos_humanos">RRHH</Nav.Link>
                <Nav.Link as={Link} to="/tesoreria">Tesorería</Nav.Link>
                <Nav.Link as={Link} to="/tic">TIC</Nav.Link>
            </>
        );
    };

    return (
        <Navbar expand="lg" sticky="top" className="mb-4 navbar-custom">
            <Container fluid className="px-0">
                <Nav className="me-2" style={{ paddingLeft: '20px' }}>
                    <NavDropdown title="☰" id="basic-nav-dropdown">    
                        <NavDropdown.Item as={Link} to="/informe/ventas">Ventas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/informe/financiero">Financiero</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/contabilidad">Contabilidad</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/corte-laminas">Corte de laminas</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Navbar.Brand as={Link} to="/dashboard" style={{ marginLeft: '15px', color: '#333', fontWeight: 'bold' }}>
                    {organizacion || 'ORGANIZACION GYJ'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" style={{ marginRight: '15px', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                        {renderNavLinks()}
                        <NavDropdown 
                            title={<img src="https://cdn.phototourl.com/free/2026-05-28-46de0ce8-53a3-4b0d-9a8b-582f91e091f6.png" alt="Perfil" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />} 
                            id="user-nav-dropdown" 
                            className="fw-bold" 
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/noticias">Noticias</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/comentarios">Comentarios</NavDropdown.Item>
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
