import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ show, handleClose, idPaseador }) => {
  const [idCategoria, setIdCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [foto, setFoto] = useState(null);

  const handleIdCategoriaChange = (e) => {
    console.log('Valor seleccionado:', e.target.value);
    const selectedIdCategoria = parseInt(e.target.value, 10); // Convierte a número entero base 10
    setIdCategoria(selectedIdCategoria);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleExperienciaChange = (e) => {
    setExperiencia(e.target.value);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo de la lista de archivos seleccionados
    setFoto(file);
  };
  
  const handleSubmit = async () => {
    const endpoint = `http://localhost:8080/api/v1/paseador/edit/${idPaseador}`;
    console.log('Datos a enviar al servidor:', { idCategoria, descripcion, experiencia });

    try {
      await axios.put(endpoint, {
        idCategoria,
        descripcion,
        experiencia,
      });

      if (foto) {
        const fotoEndpoint = `http://localhost:8080/api/v1/paseador/${idPaseador}/foto`;
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
          <Form.Group controlId="idCategoria">
            <Form.Label>Selecciona una categoría</Form.Label>
            <Form.Control as="select" onChange={handleIdCategoriaChange}>
              <option value="1">Experto</option>
              <option value="2">Novato</option>
              <option value="3">Exótico</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción"
              onChange={handleDescripcionChange}
            />
          </Form.Group>
          <Form.Group controlId="experiencia">
            <Form.Label>Experiencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la experiencia"
              onChange={handleExperienciaChange}
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

export default EditModal;
