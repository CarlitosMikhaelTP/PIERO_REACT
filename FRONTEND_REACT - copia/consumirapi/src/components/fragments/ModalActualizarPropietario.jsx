import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalActualizarPropietario = ({ show, handleClose, idPropietario }) => {
  const [comentario, setComentario] = useState('');
  const [preferenciasPaseo, setPreferenciasPaseo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [foto, setFoto] = useState(null); 

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handlePreferenciasPaseoChange = (e) => {
    setPreferenciasPaseo(e.target.value);
  };

  const handleSaldoChange = (e) => {
    setSaldo(e.target.value);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo de la lista de archivos seleccionados
    setFoto(file);
  };


  const handleSubmit = async () => {
    const endpoint = `http://localhost:8080/api/v1/propietario/edit/${idPropietario}`;
    console.log('Datos a enviar al servidor:', { comentario, preferenciasPaseo, saldo });

    try {
      await axios.put(endpoint, {
        comentario,
        preferenciasPaseo,
        saldo,
      });

      if (foto) {
        const fotoEndpoint = `http://localhost:8080/api/v1/propietario/${idPropietario}/foto`;
        const formData = new FormData();
        formData.append('foto', foto);
        await axios.post(fotoEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }


  
      handleClose(); // Cerrar el modal después de la actualización exitosa
    } catch (error) {
      console.error('Error al actualizar:', error);
      // Manejo de errores en caso de fallo en la solicitud
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="comentario">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su comentario"
              onChange={handleComentarioChange}
            />
          </Form.Group>
          <Form.Group controlId="preferenciasPaseo">
            <Form.Label>Preferencias de paseo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la experiencia"
              onChange={handlePreferenciasPaseoChange}
            />
          </Form.Group>
          <Form.Group controlId="saldo">
            <Form.Label>Saldo</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese su nuevo saldo"
              onChange={handleSaldoChange}
            />
          </Form.Group>
          <Form.Group controlId="foto">
            <Form.Label>Selecciona una foto</Form.Label>
            <Form.Control type="file" onChange={handleFotoChange} accept="image/*" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActualizarPropietario;
