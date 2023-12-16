import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({}); // Estado para almacenar los datos editados
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate(); // Inicializa navigate
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:8080/api/v1/user/findUserById/${userId}`);
          setUserData(response.data);
        } else {
          console.error('ID de usuario no encontrado en el almacenamiento local');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    
    fetchUserData();
  }, [userId]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/user/editUser/${userId}`, editedData);
      console.log('Datos actualizados:', response.data);
      handleCloseModal();
      // Recargar la página después de una actualización exitosa
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/delete/${userId}`);
      setShowDeleteModal(false);
      navigate('/'); // Redireccionar a la página de inicio o realizar alguna acción adicional después de eliminar la cuenta
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p >Nombres: {userData.nombres}</p>
          <p>Apellidos: {userData.apellidos}</p>
          <p>Apodo: {userData.apodo}</p>
          <p>Dirección: {userData.direccion}</p>
          <p>Edad: {userData.edad}</p>
          <p>Celular: {userData.celular}</p>
          <p>DNI: {userData.dni}</p>
          <p>Email: {userData.email}</p>

          {/* Botón para abrir el modal */}
          <button variant="primary"  onClick={handleOpenModal}>Editar Perfil</button>
          <button variant="danger" onClick={() => setShowDeleteModal(true)}>Eliminar cuenta</button>
          {/* Modal */}
          {showModal && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Aquí van los campos del formulario de edición */}
                <Form.Group controlId="formNombres">
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombres"
                    name="nombres"
                    value={editedData.nombres || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formApellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={editedData.apellidos || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formApodo">
                  <Form.Label>Apodo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apodo"
                    name="apodo"
                    value={editedData.apodo || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDireccion">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Direccion"
                    name="direccion"
                    value={editedData.direccion || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEdad">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Edad"
                    name="edad"
                    value={editedData.edad || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCelular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Celular"
                    name="celular"
                    value={editedData.celular || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDni">
                  <Form.Label>Dni</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dni"
                    name="dni"
                    value={editedData.dni || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editedData.email || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña nueva"
                    name="password"
                    value={editedData.password || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                {/* ... Otros campos del formulario */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
          )}
        {showDeleteModal && (
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              {/* Modal de advertencia para eliminar cuenta */}
              <Modal.Header closeButton>
                <Modal.Title>Eliminar Cuenta</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que quieres eliminar tu cuenta permanentemente?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
        )}
          {showDeleteModal && (
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              {/* Modal de advertencia para eliminar cuenta */}
              <Modal.Header closeButton>
                <Modal.Title>Eliminar Cuenta</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que quieres eliminar tu cuenta permanentemente?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;
