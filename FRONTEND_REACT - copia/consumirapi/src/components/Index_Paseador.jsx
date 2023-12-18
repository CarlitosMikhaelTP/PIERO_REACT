import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from './fragments/EditModal'; 
import PropietariosList from "./fragments/PropietariosList";
import NavbarPaseador from './fragments/NavbarPaseador'
import Footer from './fragments/Footer'
import '../assets/css/Index_Dueno.css'
import mapa1 from '../assets/css/img/mapa1.jpg'

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
      TextVisible: false,
    };
  }

  // VISTA DEL SALDO
  toggleText = () => {
    this.setState((prevState) => ({
      TextVisible: !prevState.TextVisible,
    }));
  };

  // LISTA DE PROPIETARIOS
  handlePropietariosClick = () => {
    this.setState(prevState => ({
      showPropietarios: !prevState.showPropietarios, // Cambia el estado de showPropietarios al contrario del estado actual
    }));
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
          <Footer></Footer>
      </React.Fragment>
        );
    }
    // Si el perfil ya está creado, no mostrar el formulario, solo mostrar la página normal

    //Contenido de la página
      return(
        <React.Fragment>
          <NavbarPaseador></NavbarPaseador>

          <div className="d-flex flex-nowrap">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '220px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <div style={{marginLeft:'10px', marginRight:'10px', fontSize:'25px'}}>
            <i class="fa-solid fa-user"></i></div>
          <span className="fs-4">Paseador</span>
        </a>
        <hr/>
        <Link className="navbar-brand" to="/" style={{marginLeft: '10px'}}>
	    	<a class="navbar-brand" href=""><i class="fa-solid fa-angle-left"></i> Página principal</a>
          </Link>
          <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
            <i class="fa-solid fa-paw fa-flip" style={{marginLeft:'10px', marginRight:'10px', fontSize:'15px'}}></i>
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white" aria-current="page">
            <i class="fa-solid fa-address-card" style={{marginLeft:'10px', marginRight:'10px', fontSize:'15px'}}></i>
              Mi Información
            </a>
          </li>
        </ul>
      </div>

        <div className="mt-3" style={{width:'100%'}}>
  <div className="container-fluid">
    <div className="row px-1">

          <div className="col-md-8">
            {/* Sección para editar ubicación y disponibilidad */}
          <div className="edit-section">
          <div className="row align-items-center justify-content-between">
            <div className="col">
          <h3>Actualiza tu ubicación</h3>
          </div>

          <div className="col">
          <div className="d-flex flex-fill align-items-center text-center">
            <button className="ojito" onClick={this.toggleText}>
            {this.state.TextVisible ? <i class="fa-solid fa-eye-slash fa-beat"></i> : <i class="fa-solid fa-eye fa-beat"></i>}
            </button>
            <label className="saldo">Saldo: S/.</label>
            <label className={`saldo ${this.state.TextVisible ? 'show' : 'hide'}`}>
            {formData.saldo}
            </label>
          </div>
          </div>
          </div>
          
          <Form>
            <Form.Group controlId="formUbicacion">
              <div className="row align-items-center" style={{width:'100%'}}>
              <div className="col-md-10">
              <Form.Control
                type="text"
                placeholder="Ingrese la ubicación"
                name="ubicacion"
                value={this.state.formData.ubicacion || ''} // Asegúrate de tener un valor por defecto ''
                onChange={this.handleInputChange} style={{width:'100%'}}/>
              </div>

              <div className="col-md-2">
              <Button variant="primary" onClick={this.handleEditSubmit}>
              Actualizar
            </Button>
            </div>
            </div>
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
          </Form>
        </div>

        <div className="text-center py-3">
        <img src={mapa1} alt="" style={{width:'100%'}}/>
      </div>
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

        <div className="col-md-4">
      <div>
        <Button variant="primary" onClick={this.handlePropietariosClick}>
          {showPropietarios ? 'Ocultar Propietarios' : 'Mostrar Propietarios'}
        </Button>
        {showPropietarios && <PropietariosList />} {/* Renderiza PropietariosList si showPropietarios es true */}
      </div>
      </div>
      </div>
      </div>
      </div>


      </div>
      <Footer></Footer>
         </React.Fragment>
    );
  }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Paseador
 