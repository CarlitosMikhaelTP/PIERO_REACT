import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const PropietariosList = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/propietario/findAllPropietarios');
        setPropietarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching propietarios:', error);
      }
    };

    fetchPropietarios();
  }, []);

return (
  <div className="d-flex flex-wrap">
      {propietarios.map(propietario => (
        <Card key={propietario.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold">{propietario.nombres}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted font-italic">{propietario.apellidos}</Card.Subtitle>
            <Card.Text>
              <span className="fw-bold">Saldo:</span> {propietario.saldo}
              <br />
              <span className="fw-bold">Calificación:</span> {propietario.calificacion}
              <br />
              <span className="fw-bold">Ubicación:</span> {propietario.ubicacion}
              <br />
              <span className="fw-bold">Comentario:</span> {propietario.comentario}
              <br />
              <span className="fw-bold">Preferencias de Paseo:</span> {propietario.preferenciasPaseo}
              {/* Agregar otros detalles del propietario si es necesario */}
            </Card.Text>
            <Button variant="primary">Contactar</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
);
};

export default PropietariosList;
