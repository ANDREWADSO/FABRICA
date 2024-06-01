import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import space3 from '../assets/img/space3.json';
import '@fortawesome/fontawesome-free/css/all.css';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({});

    const clientId = "820254293735-tbvel3tqdnoon17chfdne4j5vr1act6q.apps.googleusercontent.com";

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                client_id: clientId,
            });
        };
        gapi.load("client:auth2", start);
    }, [clientId]);

    const onSuccess = async (response) => {
        const profile = response.profileObj;
        setUser(profile);
        setMessage('¡Registro con Google exitoso!');

        try {
            const apiResponse = await fetch('https://nodebackend-vv0e.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile.name,
                    lastname: profile.familyName,
                    email: profile.email,
                    password: profile.googleId,
                    role: 'user',
                    confirmPassword: profile.googleId,
                }),
            });

            const data = await apiResponse.json();
            if (!apiResponse.ok) {
                throw new Error(data.message || 'Error en el registro');
            }

            console.log('Registro exitoso con API', data);
            setMessage('¡Registro exitoso con API!');
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error en el registro con API. Por favor, inténtelo de nuevo.');
        }
    };

    const onFailure = (response) => {
        console.log("Error al cargar", response);
        setMessage('Error al registrarse con Google. Por favor, inténtelo de nuevo.');
    };

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
                <label htmlFor="name">Nombres</label>
                <div style={{display: 'flex', alignItems:'center'}}>
                <i className="fa-solid fa-user-large" style={{marginRight:'10px'}}></i>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    id="name" 
                    name="name" 
                    placeholder="Ingresa tu nombre" 
                    required
                />
                </div>
                <label htmlFor="lastname">Apellidos</label>
                <div style={{display: 'flex', alignItems:'center'}}>
                <i className="fa-regular fa-user" style={{marginRight: '10px'}}></i>
                <input 
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    type="text" 
                    placeholder="Ingresa tu apellido" 
                    id="lastname" 
                    name="lastname" 
                    required
                />
                </div>
                <label htmlFor="email">Email</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <i className="fa-solid fa-envelope" style={{marginRight: '10px'}}></i>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Ingresa tu email" 
                    id="email" 
                    name="email" 
                    required
                />
                </div>
                <label htmlFor="password">Contraseña</label>
                <div style={{display:'flex', alignItems: 'center'}}>
                <i className="fa-solid fa-lock" style={{marginRight: '10px'}}></i>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Escribe tu constreña" 
                    id="password" 
                    name="password" 
                    required
                />
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <i className="fa-solid fa-key" style={{marginRight: '10px'}}></i>
                <input 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    type="password" 
                    placeholder="Confirma tu contraseña" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    required
                />
                </div>
                <label htmlFor="role">Selecciona tu Rol</label>
                <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <i className="fa-solid fa-square-check" style={{marginRight:'10px'}}></i>
                
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    id="role"
                    name="role"
                    required
                    className="rol-select"
                    style={ {flex: '1'}}
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                </div>
            <div style={{display:'flex', alignItems: 'center', width:'100%', marginTop: '10px' }}>
            <i className="fa-brands fa-uniregistry" style={{marginRight:'10px'}}></i>
            <button type="submit" style={{flex: '1'}}>Registrar</button>
            </div>
            </form>
            <p>{message}</p>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>¿Ya tienes una cuenta? Ingresa aquí.</button>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                <Lottie animationData={space3} loop={true} style={{ height: 200, width: 200 }} />
            </div>

            <div className='center'>
                <h3>Regístrate con tu cuenta de Google</h3>
                <div className='btn'>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_policy"}
                    />
                </div>
                {user && (
                    <div className="profile">
                        <img src={user.imageUrl} alt='' />
                        <h3>{user.name}</h3>
                    </div>
                )}
            </div>
            <i class="fa-solid fa-rotate-left"></i>
                <br />
            <Link to="/" className="volver-button">Volver al Inicio</Link>
        </div>
        
    );
};

export default Register;
