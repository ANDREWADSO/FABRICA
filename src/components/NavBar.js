
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import logo from '../assets/img/logo.svg';
import { useNavigate, NavLink } from "react-router-dom"; //importamos el useHistory para mostrar button
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';



export const CustomNavbar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate(); //Se inicializa el use History para mostrar en el botón "Conectate"

    useEffect(() => {
        const onScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
    
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
  }, [])

    const onUpdateActiveLink = (value) => {
      setActiveLink(value);
  }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/habilidades" className={activeLink === 'habilidades' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('habilidades')}>Habilidades</Nav.Link>
            <Nav.Link as={NavLink} to="/proyecto" className={activeLink === 'proyecto' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('proyecto')}>Proyecto</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="/habilidades"><img src={navIcon1} alt="nav icon 1" /></a>
              <a href="/habilidades"><img src={navIcon2} alt="nav icon 2" /></a>
              <a href="/habilidades"><img src={navIcon3} alt="nav icon 3" /></a>
            </div>
            <button className="vvd" onClick={() => navigate('/login')}><span>¡Conectate!</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
