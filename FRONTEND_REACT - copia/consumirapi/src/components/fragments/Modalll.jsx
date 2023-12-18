import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Modalll = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información actualizada</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Contenido del cuerpo del modal */}
        <p>Tu información ha sido actualizada exitosamente.</p>
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para cerrar el modal */}
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalll;
