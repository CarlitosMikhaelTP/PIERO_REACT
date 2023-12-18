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
          <a href='#' style={{textDecoration:'none'}}>
        <Card key={paseador.id} style={{ width: '100%', margin: '10px' }} className='sombra2'>
          
          <div className="fila2">
          <div className='calificacion'><i class="fa-solid fa-star"></i>{paseador.calificacion}</div>
          <div className="row">
            <div className="col-md-4">
            {paseador.foto && (
                <div>
                  <img src={`http://localhost:8080/api/v1/paseador/foto/${paseador.idPaseador}`} 
                  alt="Foto del paseador" 
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}/>
                </div>
              )}
              <br/>
            </div>
          
            <div className="col-md-8">
              <div className='row'>
              <Card.Title className="font-weight-bold">{paseador.nombres}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted font-italic">{paseador.apellidos}</Card.Subtitle>
            <div className="ubicacion"><i class="fa-solid fa-location-dot"></i>{paseador.ubicacion}</div>
            <div className="comentario"><i class="fa-solid fa-money-bill-wave"></i>S/.{paseador.tarifa}</div>
            </div>
            </div>
        </div>
        </div>
        </Card>
        </a>
      ))}
    </div>
);
};

export default PaseadoresList;
