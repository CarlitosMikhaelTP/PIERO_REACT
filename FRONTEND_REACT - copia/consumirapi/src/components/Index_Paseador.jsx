import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from './fragments/EditModal'; 
import PropietariosList from "./fragments/PropietariosList";

class Index_Paseador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [
        { id: 1, nombre: 'Experto' },
        { id: 2, nombre: 'Novato' },
        { id: 3, nombre: 'Exótico' },
      ],
      selectedCategoria: '',
      tarifas: {
        Experto: 20,
        Novato: 15,
        Exótico: 30,
      },
      formData: {
        idUsuario: localStorage.getItem('id') || '',
        idCategoria: '',
        calificacion: '',
        descripcion: '',
        experiencia: '',
        ubicacion: '',
        tarifa: '',
        saldo: 0,
        disponibilidad: false,
        profileCreated: false, // Estado para controlar si se ha creado el perfil
        
      },
      showModal: false,
      mapInitialized: false, // Agrega un estado para verificar si el mapa se ha inicializado
      initialRegistration: false, // Agrega initialRegistration al estado    
      showSuccessModal: false, // Estado para controlar la visualización del modal de registro exitoso
      paseadorInfo: null,
      loadingPaseadorInfo: true,
      showSuccessModal: false,
      showEditModal: false, 
      showPropietarios: false,
    };
  }

  // LISTA DE PROPIETARIOS
  handlePropietariosClick = () => {
    this.setState(prevState => ({
      showPropietarios: !prevState.showPropietarios, // Cambia el estado de showPropietarios al contrario del estado actual
    }));
  };

  // MODAL PARA EDITAR CAMPOS DESCRIPCION
  handleModalEditarCampos = () => {
    this.setState({ showEditModal: true });
  };

    async componentDidMount() {
      const userId = localStorage.getItem('id');
      const idPaseador = localStorage.getItem('idPaseador');

      if (idPaseador) {
        this.setState({ profileCreated: true });
      }

      if (userId) {
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            idUsuario: userId,
          },
        }));
        this.checkProfileExistence(userId);
      }

      this.loadPaseadorInfo(idPaseador);
    }

    async loadPaseadorInfo(idPaseador) {
      if (idPaseador) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/paseador/findPaseadorById/${idPaseador}`);
          this.setState({ paseadorInfo: response.data, loadingPaseadorInfo: false });
        } catch (error) {
          console.error('Error al obtener la información del paseador:', error);
          this.setState({ loadingPaseadorInfo: false });
        }
      }
    }

    // Método para verificar si el perfil existe en el servidor
  async checkProfileExistence(IdPaseador) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/paseador/findPaseadorById/${IdPaseador}`);
      if (response.data) {
        // Si el perfil existe, establecer profileCreated en true
        this.setState({ profileCreated: true });
      }
    } catch (error) {
      console.error('Error al verificar la existencia del perfil:', error);
    }
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
  
    // Verifica si el campo modificado es la categoría y actualiza los datos correspondientes
    if (name === 'idCategoria') {
      const selectedCategoria = fieldValue;
      const { categorias, tarifas } = this.state;
  
      // Busca la categoría seleccionada en la lista de categorías
      const selectedCategory = categorias.find(
        (categoria) => categoria.nombre === selectedCategoria
      );
  
      // Obtiene el ID y tarifa correspondiente a la categoría seleccionada
      const selectedCategoryId = selectedCategory ? selectedCategory.id : '';
      const tarifa = tarifas[selectedCategoria] || '';
  
      this.setState((prevState) => ({
        selectedCategoria,
        formData: {
          ...prevState.formData,
          idCategoria: selectedCategoryId, // Actualiza el ID de la categoría en el formulario
          tarifa, // Actualiza la tarifa en el formulario
        },
      }));
    } else {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: fieldValue,
        },
      }));
    }
  };

  handleCategoriaChange = (event) => {
    const selectedCategoria = event.target.value;
    const { categorias, tarifas} = this.state;
  
    // Busca la categoría seleccionada en la lista de categorías
    const selectedCategory = categorias.find(
      (categoria) => categoria.nombre === selectedCategoria
    );
  
    // Obtiene el ID y tarifa correspondiente a la categoría seleccionada
    const selectedCategoryId = selectedCategory ? selectedCategory.id : '';
    const tarifa = tarifas[selectedCategoria] || '';
  
    this.setState((prevState) => ({
      selectedCategoria,
      formData: {
        ...prevState.formData,
        idCategoria: selectedCategoryId, // Actualiza el ID de la categoría en el formulario
        tarifa, // Actualiza la tarifa en el formulario
      },
    }));
  };
  
  
  
  handleSubmit = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/paseador/register', formData);
      localStorage.setItem('idPaseador', response.data.idPaseador);
      this.setState({ showModal: false, profileCreated: true }, () => {
        window.location.reload(); // Recargar la página después del registro
      });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  handleEditSubmit = async () => {
    const { ubicacion, disponibilidad } = this.state.formData;
    const idPaseador = localStorage.getItem('idPaseador');
    const dataToUpdate = {
      ubicacion,
      disponibilidad,
    };
    try {
      await axios.put(`http://localhost:8080/api/v1/paseador/edit/${idPaseador}`, dataToUpdate);
      // Aquí podrías mostrar un mensaje de éxito o realizar alguna otra acción después de la edición
      this.setState({ showSuccessModal: true });
    } catch (error) {
      console.error('Error al editar la información:', error);
      // Manejo de errores
    }
  };

  handleCloseModal = async() => {
    const {descripcion, experiencia, idCategoria} = this.state.formData;
    const idPaseador = localStorage.getItem('idPaseador');
    const someUpdate = {
      descripcion,
      experiencia,
      idCategoria
    };
    try {
      await axios.put(`http://localhost:8080/api/v1/paseador/edit/${idPaseador}`, someUpdate);
      // Aquí podrías mostrar un mensaje de éxito o realizar alguna otra acción después de la edición
    this.setState({ showModal: true });
  } catch(error){
    console.error('Error al editar la información:', error);
  }
};



  renderPaseadorInfo() {
    const { paseadorInfo, loadingPaseadorInfo } = this.state;

    if (loadingPaseadorInfo) {
      return <div>Cargando información del paseador...</div>;
    }

    if (!paseadorInfo) {
      return <div>No se encontró información del paseador.</div>;
    }
    return (
      <div>
        <h2>Información del Paseador</h2>
        <p>Nombre: {paseadorInfo.nombres}</p>
        <p>Apellidos: {paseadorInfo.apellidos}</p>
        <p>Categoría: {paseadorInfo.categoriaNombre}</p>
        <p>Descripción: {paseadorInfo.descripcion}</p>
        <p>Experiencia: {paseadorInfo.experiencia}</p>
        {paseadorInfo.foto && (
        <div>
            <p>Foto:</p>
            <img src={`http://localhost:8080/api/v1/paseador/foto/${paseadorInfo.idPaseador}`} 
            alt="Foto del paseador" 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}/>
          </div>
        )}
        <p>Tarifa: {paseadorInfo.tarifa}</p>
        <p>Saldo: {paseadorInfo.saldo}</p>
        {/* Mostrar otros detalles del paseador según la estructura de la respuesta */}
      </div>
    );
  }


    //creamos metodo render que retornara los elementos html
    render(){
      const { categorias, selectedCategoria, formData, showModal, profileCreated, showPropietarios } = this.state;
      if (!profileCreated || showModal){
        return(
          <React.Fragment>
              <Modal show={showModal || !profileCreated} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Cuéntanos más de ti</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                              <Form onSubmit={this.handleSubmit}>
                                {/* Ejemplo de campo para la categoría */}
                                <div className="form-group">
                                  <label htmlFor="categoria">Selecciona tu categoría como paseador</label>
                                  <select
                                    className="form-control"
                                    id="categoria"
                                    name="categoria"
                                    value={selectedCategoria}
                                    onChange={this.handleCategoriaChange}
                                  >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                      <option key={categoria.id} value={categoria.nombre}>
                                        {categoria.nombre}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Resto de campos para la información del paseador */}
                                {/* Ejemplo: input para la calificación */}

                                <div className="form-group">
                                  <label htmlFor="descripcion">Añade una descripción para que la gente te conozca</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    name="descripcion"
                                    required="Añade una descripción para que las personas te conozcan"
                                    value={formData.descripcion}
                                    onChange={this.handleInputChange}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="experiencia">Cuéntanos tu experiencia como paseador</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="experiencia"
                                    name="experiencia"
                                    required="Escribe tu experiencia como paseador de perros"
                                    value={formData.experiencia}
                                    onChange={this.handleInputChange}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="calificacion">La tarifa por tu servicio varía según tu categoría</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="tarifa"
                                    name="tarifa"
                                    readOnly
                                    required="Aquí podrás ver el precio de tu servicio"
                                    value={formData.tarifa}
                                    onChange={this.handleInputChange}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="saldo">Aquí verás tu monedero</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="saldo"
                                    name="saldo"
                                    required="Aquí verás tu saldo"
                                    readOnly
                                    value={formData.saldo}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                {/* ... (otros campos del formulario) ... */}

                                <button type="submit" className="btn btn-primary">
                                  Registrar
                                </button>
                              </Form>
                            </Modal.Body>
                      </Modal>
      </React.Fragment>
        );
    }
    // Si el perfil ya está creado, no mostrar el formulario, solo mostrar la página normal
      return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
              <a className="navbar-brand" href="#">Mi Sitio</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/usertypeselection" className="nav-link" href="#">Registrarme</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" >Iniciar Sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userProfile">Perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userProfile">Buscar Clientes</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Registrar Mascota</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Buscar Paseador</a>
                  </li>
                </ul>
              </div>
             </nav>
             <hr />
             <hr />
        {/* Mostrar automáticamente la información del paseador */}
        {this.renderPaseadorInfo()}
        {/* ...resto del contenido del Index_Paseador... */}
        {/* Sección para editar ubicación y disponibilidad */}
          <div className="edit-section">
          <h3>Editar Información</h3>
          <Form>
            <Form.Group controlId="formUbicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la ubicación"
                name="ubicacion"
                value={this.state.formData.ubicacion || ''} // Asegúrate de tener un valor por defecto ''
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDisponibilidad">
              <Form.Check
               type="checkbox"
               label="Disponible"
               name="disponibilidad"
               checked={this.state.formData.disponibilidad}
               onChange={this.handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.handleEditSubmit}>
              Actualizar
            </Button>
          </Form>
        </div>

        <Modal show={this.state.showSuccessModal} onHide={() => this.setState({ showSuccessModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Actualización Exitosa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¡La información se ha actualizado correctamente!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showSuccessModal: false })}>
              Cerrar
            </Button>
          </Modal.Footer>
         </Modal>

         <Button variant="primary" onClick={this.handleModalEditarCampos}>
          Editar Campos
        </Button>

        {/* Mostrar el modal de edición */}
        <EditModal
          show={this.state.showEditModal}
          handleClose={() => this.setState({ showEditModal: false })}
          idPaseador={localStorage.getItem('idPaseador')}
        />

      <div>
        {/* ... Tu código existente ... */}
        <Button variant="primary" onClick={this.handlePropietariosClick}>
          {showPropietarios ? 'Ocultar Propietarios' : 'Mostrar Propietarios'}
        </Button>
        {showPropietarios && <PropietariosList />} {/* Renderiza PropietariosList si showPropietarios es true */}
      </div>
         </React.Fragment>
    );
  }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Paseador
 