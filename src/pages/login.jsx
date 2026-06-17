import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/login', {
                usuario,
                password
            }, { withCredentials: true });

            if (response.data.status === 'success') {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Credenciales inválidas o servidor no disponible');
        }
    };

    return (
        <div className="login-page-bg">
            <div className="login-box text-center">
                <h2>Iniciar Sesión</h2>
                {error && <div className="alert alert-danger text-start">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="mb-3 text-start">
                        <label className="form-label">Usuario</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 fw-bold">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;