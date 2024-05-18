import logo from './logo.svg';
import './App.css';
// import {NavBar} from './components/NavBar'; *****CHEQUEAR RUTA DEL NAVBAR****
import { CustomNavbar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='App'>
      < CustomNavbar />
      < Banner />
      < Skills />
      < Projects />
      < Footer />

    </div>
  );
}

export default App;

{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}