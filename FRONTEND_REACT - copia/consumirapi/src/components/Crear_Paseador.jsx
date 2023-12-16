import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Crear_Paseador = () => {
  const [paseadorData, setPaseadorData] = useState({
    idCategoria: '',
    calificacion: '',
    descripcion: '',
    experiencia: '',
    ubicacion: '',
    tarifa: '',
    disponibilidad: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaseadorData({ ...paseadorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar una solicitud al backend con los datos del paseadorData
    console.log('Datos del paseador:', paseadorData);
    // Lógica para enviar los datos al servidor
  };

  return (
    <div className="container">
      <h1>Crear Paseador</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="idCategoria">
          <Form.Label>Id de Categoría</Form.Label>
          <Form.Control
            type="number"
            name="idCategoria"
            value={paseadorData.idCategoria}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Agrega más campos según el DTO proporcionado */}
        {/* Ejemplo: Calificación */}
        <Form.Group controlId="calificacion">
          <Form.Label>Calificación</Form.Label>
          <Form.Control
            type="number"
            name="calificacion"
            value={paseadorData.calificacion}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Otros campos según el DTO */}
        
        <Button variant="primary" type="submit">
          Crear Paseador
        </Button>
      </Form>
    </div>
  );
};

export default Crear_Paseador;
