import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import '../../assets/css/Index_Paseador.css'
import '../../assets/css/superboton.css'

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
  <div className="d-flex flex-wrap" style={{width:'100%'}}>
      {propietarios.map(propietario => (
        <a href='#' style={{textDecoration:'none'}}>
        <Card key={propietario.id} style={{ width: '100%', margin: '10px' }} className='sombra2'>
          
          <div className="fila2">
          <div className='calificacion'><i class="fa-solid fa-star"></i>{propietario.calificacion}</div>
          <div className="row">
            <div className="col-md-4">
            {propietario.foto && (
                <div>
                  <img src={`http://localhost:8080/api/v1/propietario/foto/${propietario.idPropietario}`} 
                  alt="Foto del propietario" 
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}/>
                </div>
              )}
              <br/>
            </div>
          
            <div className="col-md-8">
              <div className='row'>
              <Card.Title className="font-weight-bold">{propietario.nombres}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted font-italic">{propietario.apellidos}</Card.Subtitle>
<<<<<<< HEAD
            <div className="ubicacion"><i class="fa-solid fa-location-dot"></i>{propietario.ubicacion}</div>
            <div className="comentario"><i class="fa-solid fa-comment-dots"></i>{propietario.comentario}</div>
            </div>
            </div>
        </div>
        </div>
=======
            <Card.Text>
              <span className="fw-bold">Saldo:</span> {propietario.saldo}
              <br />
              <span className="fw-bold">Calificación:</span> {propietario.calificacion}
              <br />
              <span className="fw-bold">Ubicación:</span> {propietario.ubicacion}
              <br />
              {propietario.foto && (
                <div>
                  <p>Foto:</p>
                  <img src={`http://localhost:8080/api/v1/propietario/foto/${propietario.idPropietario}`} 
                  alt="Foto del propietario" 
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}/>
                </div>
              )}
              <br/>
              <span className="fw-bold">Comentario:</span> {propietario.comentario}
              <br />
              <span className="fw-bold">Preferencias de Paseo:</span> {propietario.preferenciasPaseo}
              {/* Agregar otros detalles del propietario si es necesario */}
            </Card.Text>
            <Button variant="primary">Contactar</Button>
          </Card.Body>
>>>>>>> d15f7929bfa795f0a64150d72825dcafb49efbca
        </Card>
        </a>
      ))}
    </div>
);
};

export default PropietariosList;
