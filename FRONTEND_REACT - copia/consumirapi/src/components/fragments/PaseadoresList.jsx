import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const PaseadoresList = () => {
  const [paseadores, setPaseadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaseadores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/paseador/findAllPaseadores');
        setPaseadores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching paseadores:', error);
      }
    };

    fetchPaseadores();
  }, []);

return (
  <div className="d-flex flex-wrap">
      {paseadores.map(paseador => (
        <Card key={paseador.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold">{paseador.nombres}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted font-italic">{paseador.apellidos}</Card.Subtitle>
            <Card.Text>
              <span className="fw-bold">Categoría:</span> {paseador.categoriaNombre}
              <br />
              <span className="fw-bold">Calificación:</span> {paseador.calificacion}
              <br />
              {paseador.foto && (
                <div>
                  <p>Foto:</p>
                  <img src={`http://localhost:8080/api/v1/paseador/foto/${paseador.idPaseador}`} 
                  alt="Foto del paseador" 
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}/>
                </div>
              )}
              <br/>
              <span className="fw-bold">Descripcion:</span> {paseador.descripcion}
              <br />
              <span className="fw-bold">Experiencia:</span> {paseador.experiencia}
              <br />
              <span className="fw-bold">Ubicación:</span> {paseador.ubicacion}
              <br />
              <span className="fw-bold">Tarifa:</span> {paseador.tarifa}
              {/* Agregar otros detalles del propietario si es necesario */}
            </Card.Text>
            <Button variant="primary">Contactar</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
);
};

export default PaseadoresList;
