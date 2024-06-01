import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import space2 from '../assets/img/space2.json';
import '@fortawesome/fontawesome-free/css/all.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        setMessage('¡Inicio de sesión con Google exitoso!');

        try {
            const apiResponse = await fetch('https://nodebackend-vv0e.onrender.com/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: profile.email,
                    googleId: profile.googleId,
                    name: profile.name,
                    imageUrl: profile.imageUrl,
                }),
            });

            const data = await apiResponse.json();
            if (!apiResponse.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            console.log('Inicio de sesión exitoso con API', data);
            setMessage('¡Inicio de sesión exitoso con API!');
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error en el inicio de sesión con API. Por favor, inténtelo de nuevo.');
        }
    };

    const onFailure = (response) => {
        console.log("Error al cargar", response);
        setMessage('Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.');
    };

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
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Inicio</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa-solid fa-user-astronaut" style={{ marginRight: '10px' }}></i>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
                        name="email"
                        required
                    />
                </div>

                <label htmlFor="password">Contraseña</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <i class="fa-solid fa-lock" style={{marginRight: '10px'}}></i>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    id="password"
                    name="password"
                    required
                />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '10px' }}></i>
                <button type="submit" style={{ flex: '1', minWidth: '100px' }}>Ingresar</button>
                </div>

            </form>
            <p>{message}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <i class="fa-solid fa-id-card" style={{marginRight:'10px'}}></i>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>¿No tienes una cuenta? Regístrate aquí.</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                <Lottie animationData={space2} loop={true} style={{ height: 200, width: 200 }} />
            </div>

            <div className='center'>
                <h3>Ingresa con tu cuenta de Google</h3>
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
            <div>
                <i class="fa-solid fa-rotate-left"></i>
                <br />
                <Link to="/" className="volver-button">Volver al Inicio</Link>
               
                
            </div>
        </div>
    );
};

export default Login;
