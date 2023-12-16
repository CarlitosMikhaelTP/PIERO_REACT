import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserProfileForm = ({ userId, onClose }) => {
    console.log(userId, onClose);
    const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    apodo: '',
    direccion: '',
    edad: '',
    celular: '',
    dni: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/editUser/${userId}`, formData);
      console.log('Datos actualizados:', response.data);
      onClose();
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    }
  };

  return (
    <div className="modal">
      <label>
        Nombres:
        <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} />
      </label>
      <label>
        Apellidos:
        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} />
      </label>
      <label>
        Apodo:
        <input type="text" name="apodo" value={formData.apodo} onChange={handleInputChange} />
      </label>
      <label>
        Direccion:
        <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
      </label>
      <label>
        Edad:
        <input type="number" name="edad" value={formData.edad} onChange={handleInputChange} />
      </label>
      <label>
        Celular:
        <input type="text" name="celular" value={formData.celular} onChange={handleInputChange} />
      </label>
      <label>
        Dni:
        <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </label>
      {/* Agrega más campos para editar */}
      
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditUserProfileForm;
