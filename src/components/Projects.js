// Projects.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { Nav, Tab } from 'react-bootstrap';
import TrackVisibility from 'react-on-screen'; 


const projects = [
  {
    title: "Video 1",
    description: "Description for Video 1",
    videoId: "sQLn2asTefo"
  },
  {
    title: "Video 2",
    description: "Description for Video 2",
    videoId: "H5L66Lx_TWU"
  },
  {
    title: "Video 3",
    description: "Description for Video 3",
    videoId: "eOow74IMTpc"
  },
  {
    title: "Video 4",
    description: "Description for Video 4",
    videoId: "uNjermCldOg"
  },
  {
    title: "Video 5",
    description: "Description for Video 5",
    videoId: "gAsQEvSXsKc"
  },
  {
    title: "Video 6",
    description: "Description for Video 6",
    videoId: "FS9u9cIGf3o"
  }
];

export const Projects = () => {
  return (
    <section className="projects" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                  <h2>Proyecto</h2>
                  <p>Para facilitar la comprensión y aplicación del test VAK, se han desarrollado una serie de videos didácticos que guían a los usuarios en el proceso de identificación de su estilo de aprendizaje. Estos videos no solo explican detalladamente los conceptos detrás del modelo VAK, sino que también ofrecen ejercicios prácticos y ejemplos reales para ayudar a los individuos a reconocer sus preferencias.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="section">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
