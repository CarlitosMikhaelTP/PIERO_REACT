//Anotacion jsx para crear los componentes
//Llamamos a la librería de React
import React from "react";
//Anotacion jsx para crear los componentes
//servicios
//Importando Axios
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/css/img/Logo.jpeg'
import mapa1 from '../assets/css/img/mapa1.jpg'

import NavbarDueno from './fragments/NavbarDueno'
import Footer from './fragments/Footer'
import { Modal, Button, Form } from 'react-bootstrap'; 

import '../assets/css/Index_Dueno.css'
import '../assets/css/sidebars.css'
import '../assets/js/sidebars.js'
import '../assets/css/superboton.css'
import '../assets/js/adicionales.js'
import ModalRegistroPropietario from "./fragments/ModalRegistroPropietario.jsx";
import ModalActualizarPropietario from "./fragments/ModalActualizarPropietario.jsx";
import PaseadoresList from "./fragments/PaseadoresList.jsx";

//Crear una clase que herede de React Component
class Index_Dueno extends React.Component{
  //creamos metodo render que retornara los elementos html
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        idPropietario: '', 
        ubicacion: '',
        disponibilidad: false,
        comentarios: '',
        preferenciasPaseo: '',
        saldo: 0,
      },
      TextVisible: false,
      idPropietario: localStorage.getItem("idPropietario"),
      showModal: false,
      showSuccessModal: false,
      showModalActualizarPropietarios: false,
      showPaseadores: false,
      propietarioInfo: null,
      
    };
  }

// LISTA DE PASEADORES
handlePaseadoresClick = () => {
  this.setState(prevState => ({
    showPaseadores: !prevState.showPaseadores, // Cambia el estado de showPaseadores al contrario del estado actual
  }));
};


  // MODAL PARA EDITAR CAMPOS DESCRIPCION
  handleModalEditarCampos = () => {
    this.setState({ showModalActualizarPropietarios: true });
  };

  handleCloseEditarCampos = () => {
    this.setState({ showModalActualizarPropietarios: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false }); // Cierra el modal al hacer clic en Cerrar
  };

  componentDidMount() {
    if (!this.state.idPropietario) {
      // Si no hay idPropietario en el LocalStorage, muestra el modal
      this.setState({ showModal: true });
    }
  }
  
  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: inputValue,
      },
    }));
  };

  toggleText = () => {
    this.setState((prevState) => ({
      TextVisible: !prevState.TextVisible,
    }));
  };

  handleEditSubmit = async () => {
    const { ubicacion, disponibilidad } = this.state.formData;
    const idPropietario = localStorage.getItem('idPropietario');
    const dataToUpdate = {
      ubicacion,
      disponibilidad,
    };
    try {
      await axios.put(`http://localhost:8080/api/v1/propietario/edit/${idPropietario}`, dataToUpdate);
      // Aquí podrías mostrar un mensaje de éxito o realizar alguna otra acción después de la edición
      this.setState({ showSuccessModal: true });
    } catch (error) {
      console.error('Error al editar la información:', error);
      // Manejo de errores
    }
  };

  async componentDidMount() {
    const idPropietario = localStorage.getItem('idPropietario');
    if (idPropietario) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/propietario/findPropietarioById/${idPropietario}`);
        const propietarioInfo = response.data;
        this.setState({ propietarioInfo });
      } catch (error) {
        console.error('Error al obtener la información del propietario:', error);
        // Manejar errores
      }
    }
  }
  renderPropietarioInfo() {
    const { propietarioInfo } = this.state;
    if (!propietarioInfo) {
      return <p>Cargando información del propietario...</p>;
    }

    return (
      <div className="propietario-info">
        <h2>Perfil de Propietario</h2>
        <p>Nombre: {propietarioInfo.nombres} {propietarioInfo.apellidos}</p>
        <p>Ubicación: {propietarioInfo.ubicacion}</p>
        <p>Preferencias de paseo: {propietarioInfo.preferenciasPaseo}</p>
       {/* <p>Calificación: {propietarioInfo.calificacion}</p> */} 
        <p>Comentario: {propietarioInfo.comentario}</p>
        {/* Otros detalles del propietario */}
      </div>
    );
  }
  

  
  
  render(){
    const {disponibilidad, ubicacion,showModal, showPaseadores} = this.state;
    return(
    <React.Fragment>

    <NavbarDueno></NavbarDueno>
    <div className="d-flex flex-nowrap">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '220px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <div style={{marginLeft:'10px', marginRight:'10px', fontSize:'25px'}}>
            <i class="fa-solid fa-user"></i></div>
          <span className="fs-4">Tu Perfil</span>
        </a>
        <hr/>
        <Link className="navbar-brand" to="/" style={{marginLeft: '10px'}}>
	    	<a class="navbar-brand" href=""><i class="fa-solid fa-angle-left"></i> Página principal</a>
          </Link>
          <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <a href="/index_dueno" className="nav-link active" aria-current="page">
            <i class="fa-solid fa-paw fa-flip" style={{marginLeft:'10px', marginRight:'10px', fontSize:'15px'}}></i>
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a href="/infopropietario" className="nav-link text-white" aria-current="page">
            <i class="fa-solid fa-address-card" style={{marginLeft:'10px', marginRight:'10px', fontSize:'15px'}}></i>
              Mi Información
            </a>
          </li>
        </ul>
      </div>
      <div className="">
<div className="row" style={{width:'100%'}}>

  <div className="row" style={{marginTop:'15px', width:'100%'}}>
    <div className="col-md-4 text-center">
    <label className="saldo">Paseos pendientes: 0</label>
    </div>
    <div className="col-md-4 text-center">
    <button className="boton1"><i class="fa-solid fa-plus fa-shake"></i> INICIAR UNA RESERVA</button>
    </div>
    <div className="col-md-4 d-flex flex-file align-items-center text-center">
        <button className="ojito" onClick={this.toggleText}>
        {this.state.TextVisible ? <i class="fa-solid fa-eye-slash fa-beat"></i> : <i class="fa-solid fa-eye fa-beat"></i>}
        </button>
        <label className="saldo">Saldo: S/.</label>
        <label className={`saldo ${this.state.TextVisible ? 'show' : 'hide'}`}>
          50
        </label>
      </div>
  </div>

  <div className="col-md-12">
  <div className="container-fluid">
    <div className="row px-1">

      <div className="col-md-9 py-3">
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
        <img src={mapa1} alt="" style={{width:'100%'}}/>
      </div>

      <div className="col-md-3 py-3">

      <div className="text-cemter">
        <div className="texto1" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ alignSelf: 'flex-start' }}>
      <label>PASEADORES:</label>
      </div>
      <div style={{fontSize:'25px'}}>
      <i class="fa-solid fa-person-walking"></i>
      </div>
      </div>
      <div className="linea2"></div>
    </div>

      <div className="fila">
        <div className="row">
        <div className="apodo"> <i class="fa-solid fa-circle-user"></i> PieroQuiroz</div>
        <div className="calificacion"><i class="fa-solid fa-star"></i>4.3</div>
        <div className="tarifa">S/. 15</div>
        </div>
      </div>

      <div className="fila">
        <div className="row">
        <div className="apodo"> <i class="fa-solid fa-circle-user"></i> Apodo</div>
        <div className="calificacion">Calificacion</div>
        <div className="tarifa">Tarifa</div>
        </div>
      </div>

      <div className="fila">
        <div className="row">
        <div className="apodo"> <i class="fa-solid fa-circle-user"></i> Apodo</div>
        <div className="calificacion">Calificacion</div>
        <div className="tarifa">Tarifa</div>
        </div>
      </div>

      <div className="fila">
        <div className="row">
        <div className="apodo"> <i class="fa-solid fa-circle-user"></i> Apodo</div>
        <div className="calificacion">Calificacion</div>
        <div className="tarifa">Tarifa</div>
        </div>
      </div>

      </div>
      </div>
    
  </div>
  </div>

</div>
</div>

    </div>
    {this.state.showModal && <ModalRegistroPropietario />}

        
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

      <ModalActualizarPropietario
        show={this.state.showModalActualizarPropietarios}
        handleClose={this.handleCloseEditarCampos}
        idPropietario={this.state.idPropietario}
      />

<div>
        {/* ... Tu código existente ... */}
        <Button variant="primary" onClick={this.handlePaseadoresClick}>
          {showPaseadores ? 'Ocultar Paseadores' : 'Mostrar Paseadores'}
        </Button>
        {showPaseadores && <PaseadoresList />} {/* Renderiza PropietariosList si showPropietarios es true */}
      </div>

       {/* Agrega la llamada a la función renderPropietarioInfo() donde desees mostrar la información */}

    <Footer></Footer>
    </React.Fragment>
    );
    }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Dueno
 