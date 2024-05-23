import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa el componente Link de React Router
import bannerImg from "../assets/img/banner-bg.png";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://backend-final1.onrender.com/api-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            console.log('Inicio de sesión exitoso', data);
            setMessage('¡Inicio de sesión exitoso!');
            // Si necesitas realizar alguna acción después del inicio de sesión, aquí puedes hacerlo
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email" 
                    required
                />
                <label htmlFor="password">Contraseña</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="********" 
                    id="password" 
                    name="password" 
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            <p>{message}</p>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>¿No tienes una cuenta? Regístrate aquí.</button>
            {/* Usa el componente Link para redirigir al usuario al Home */}
            <Link to="/" className="volver-button">Volver al Inicio</Link>
        </div>
    );
};

export default Login;
