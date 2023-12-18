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
        <Card key={propietario.id} style={{ width: '100%', margin: '10px' }} className='sombra2'>
          
          <div className="fila2">
          <div className='calificacion'><i class="fa-solid fa-star"></i>{propietario.calificacion}</div>
          <div className="row">
            <div className="col-md-4">
            <i class="fa-solid fa-circle-user"></i>
            </div>
          
            <div className="col-md-8">
              <div className='row'>
              <Card.Title className="font-weight-bold">{propietario.nombres}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted font-italic">{propietario.apellidos}</Card.Subtitle>
            <div className="ubicacion"><i class="fa-solid fa-location-dot"></i>{propietario.ubicacion}</div>
            <div className="comentario"><i class="fa-solid fa-comment-dots"></i>{propietario.comentario}</div>
            </div>
            </div>
        </div>
        </div>
        </Card>
      ))}
    </div>
);
};

export default PropietariosList;
