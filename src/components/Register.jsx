import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-final1.onrender.com/api-auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                }),
            });

            // Verifica si la respuesta no es JSON
            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Error en el registro');
                }

                console.log('Registro exitoso', data);
                setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
            } else {
                const text = await response.text();
                throw new Error(`Error inesperado: ${text}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error en el registro. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Registro</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre Completo</label>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    id="name" 
                    name="name" 
                    placeholder="Nombre Completo" 
                    required
                />
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Ingresa tu email" 
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
                <button type="submit">Registrar</button>
            </form>
            <p>{message}</p>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>¿Ya tienes una cuenta? Ingresa aquí.</button>
            <Link to="/" className="volver-button">Volver al Inicio</Link>
        </div>
    );
};

export default Register;
