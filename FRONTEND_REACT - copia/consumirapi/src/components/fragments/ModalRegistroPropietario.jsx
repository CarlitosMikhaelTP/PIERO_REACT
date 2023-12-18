import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'; 


const ModalRegistroPropietario = () => {
  const [comentario, setComentario] = useState('');
  const [preferenciasPaseo, setPreferenciasPaseo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    // Obtener el id del usuario del LocalStorage
    const idUsuario = localStorage.getItem('id');
    checkPropietarioExistence(idUsuario);
  }, []);

  const handleRegister = async () => {
    const idUsuario = localStorage.getItem('id');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/propietario/register', {
        idUsuario,
        comentario,
        preferenciasPaseo,
        saldo,
      });
      console.log('Registro exitoso:', response.data);
      setShowModal(false); // Cerrar el modal después de completar el registro
    } catch (error) {
      console.error('Error al registrar al propietario:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const checkPropietarioExistence = async () => {
    // Obtener el idPropietario del LocalStorage
    const idPropietario = localStorage.getItem('idPropietario');
  
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/propietario/findPropietarioById/${idPropietario}`);
      console.log('El idPropietario existe para este usuario');
    } catch (error) {
      console.error('El idPropietario no existe para este usuario');
      setShowModal(true); // Mostrar el modal si el idPropietario no existe
    }
  };
  
  useEffect(() => {
    checkPropietarioExistence();
  }, []);
  


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Propietario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="comentario">
            <Form.Label>Comentario:</Form.Label>
            <Form.Control type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="preferenciasPaseo">
            <Form.Label>Preferencias de Paseo:</Form.Label>
            <Form.Control type="text" value={preferenciasPaseo} onChange={(e) => setPreferenciasPaseo(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="saldo">
            <Form.Label>Saldo:</Form.Label>
            <Form.Control type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Registrar Propietario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default ModalRegistroPropietario;
