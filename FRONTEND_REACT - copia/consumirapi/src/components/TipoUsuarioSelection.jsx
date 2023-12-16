import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TipoUsuarioSelection() {
  const navigate = useNavigate();
  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los tipos de usuario
    const fetchTiposUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tiposUsuarios');
        setTiposUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener tipos de usuario:', error);
      }
    };

    fetchTiposUsuarios();
  }, []);

  const handleTipoUsuarioSelection = (tipoUsuario) => {
    localStorage.setItem('selectedType', JSON.stringify(tipoUsuario));
    navigate('/registro'); // Ruta del formulario de registro de usuario
  };

  return (
    <div>
      <h2>Seleccione el tipo de usuario</h2>
      {tiposUsuarios.map((tipo) => (
        <button key={tipo.id} onClick={() => handleTipoUsuarioSelection(tipo)}>
          {tipo.nombre}
        </button>
      ))}
    </div>
  );
}

export default TipoUsuarioSelection;