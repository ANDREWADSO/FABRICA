import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState ('');
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState ('');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Datos enviados:", { name, email, password, role });

        try {
            const response = await fetch('https://nodebackend-vv0e.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                    role: role,
                    confirmPassword: confirmPassword,
                }),
            });

            console.log("Estado de la respuesta:", response.status);
            console.log("Encabezados de la respuesta:", response.headers);

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();
                if (!response.ok) {
                    console.log("Datos de error:", data);
                    throw new Error(data.message || 'Error en el registro');
                }

                console.log('Registro exitoso', data);
                setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
            } else {
                const text = await response.text();
                console.log("Texto de error inesperado:", text);
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
                <label htmlFor="lastname">Apellido</label>
                <input 
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    type="text" 
                    placeholder="Ingresa tu apellido" 
                    id="lastname" 
                    name="lastname" 
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
                {/* <label htmlFor="role">Confirmar Contraseña</label> */}
                <input 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    type="password" 
                    placeholder="Confirma tu contraseña" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    required
                />
                <label htmlFor="role">Rol</label>
                <input 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    type="text" 
                    placeholder="Ingresa tu rol" 
                    id="role" 
                    name="role" 
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
