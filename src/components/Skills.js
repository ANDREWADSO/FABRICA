import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from '../assets/img/color-sharp.png';
import Lottie from 'lottie-react';
import visual from '../assets/img/visual.json';
import auditivo from '../assets/img/auditivo.json';
import lector from '../assets/img/lector.json';
import kinestesico from '../assets/img/kinestesico.json';
import '../App.css'; // Asegúrate de importar tu archivo CSS

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2>Habilidades</h2>
                            <p>Al conocer cómo aprendes mejor, puedes potenciar tus talentos y habilidades. Adapta tus métodos de estudio a tu estilo y observa cómo creces en confianza y competencia. ¡Explora tus habilidades y alcanza tu máximo potencial con el aprendizaje personalizado!.</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                <h3>Auditivo</h3>
                                    <Lottie animationData={auditivo} loop={true} style={{ height: 300, width: 300 }} />
                                    <h5>Prefiere aprender a través de explicaciones orales y discusiones. La escucha activa facilita la asimilación de conceptos.</h5>
                                </div>
                                <div className="item">
                                <h3>Kinestésico</h3>
                                    <Lottie animationData={kinestesico} loop={true} style={{ height: 300, width: 280 }} />
                                    <h5>Prefiere aprender haciendo y participando activamente. La práctica y la manipulación de objetos mejoran su comprensión.</h5>
                                </div>
                                <div className="item">
                                <h3>Visual</h3>
                                    <Lottie animationData={visual} loop={true} style={{ height: 380, width: 300 }} />
                                    <h5>Prefiere aprender mediante imágenes, gráficos y diagramas. La visualización de conceptos ayuda a la comprensión de la información.</h5>
                                </div>
                                <div className="item">
                                    <h3>Lector</h3>
                                    <Lottie animationData={lector} loop={true} style={{ height: 300, width: 300 }} />
                                    <h5>Prefiere aprender leyendo y escribiendo. Tomar notas y resumir textos facilita la retención de información</h5>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <img className="background-image-left" src={colorSharp} alt="Image" />
        </section>
    );
};

export default Skills;
