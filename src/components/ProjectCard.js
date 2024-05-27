// ProjectCard.js
import React, { useState } from "react";
import { Col, Modal, Button } from "react-bootstrap";

export const ProjectCard = ({ title, description, videoId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Col size={12} sm={6} md={4}>
        <div className="proj-imgbx" onClick={openModal}>
          <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="video thumbnail" />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </Col>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        size="lg"
        centered
        className="modal-video"
      >
        <Modal.Body>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};