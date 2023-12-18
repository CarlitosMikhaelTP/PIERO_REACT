import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap'; 
import NavbarDueno from './fragments/NavbarDueno'
import Footer from './fragments/Footer'
import ModalActualizarPropietario from "./fragments/ModalActualizarPropietario.jsx";

import '../assets/css/Index_Dueno.css'
import '../assets/styles/style.css';
import '../assets/css/register.css'

class InfoPropietario extends React.Component {
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
        // Resto del código para manejar cambios de entrada
      };
    
      handleEditSubmit = async () => {
        // Resto del código para manejar la actualización de la información
      };
    
      toggleText = () => {
        // Resto del código para manejar la visibilidad del texto
      };
    
      handleCloseEditarCampos = () => {
        this.setState({ showModalActualizarPropietarios: false });
      };
    
      handleModalEditarCampos = () => {
        this.setState({ showModalActualizarPropietarios: true });
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
          <div className="propietario-info text-center">

            <section className="mt-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="wrapper">
              <div className="row no-gutters sombra">
                <div className="col-md-12">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                  <h2 className="mb-4">Información de {propietarioInfo.nombres}</h2>
                    <form id="contactForm" name="contactForm" class="contactForm">
                      <div className="row">

                        <div className="col-md-12">
                          <div data-mdb-input-init className="form-group">
                            <label className="label" htmlFor="nombres">Nombres y Apellidos</label>
                            <input type="text" className="form-control" placeholder={`${propietarioInfo.nombres} ${propietarioInfo.apellidos}`} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Preferencias de Paseo</label>
                            <textarea type="text" className="form-control" placeholder={propietarioInfo.preferenciasPaseo} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Ubicación</label>
                            <input type="text" className="form-control" placeholder={propietarioInfo.ubicacion} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Comentario</label>
                            <input type="text" className="form-control" placeholder={propietarioInfo.comentario} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                          <Button variant="primary" onClick={this.handleModalEditarCampos}>Editar Información</Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
          </div>
        );
      }
    
      render() {
        return (
          <React.Fragment>
            <NavbarDueno></NavbarDueno>
            <div className="">
              {/* ... Código existente ... */}
              <div className="">
                <div className="row" style={{ width: '100%' }}>
                  {/* ... Sección de edición de información ... */}
                </div>
                <ModalActualizarPropietario
                  show={this.state.showModalActualizarPropietarios}
                  handleClose={this.handleCloseEditarCampos}
                  idPropietario={this.state.idPropietario}
                />
                <div>
                  {this.renderPropietarioInfo()}
                </div>
              </div>
              {/* ... Otro contenido ... */}
            </div>
            <Footer></Footer>
          </React.Fragment>
        );
      }
    }

export default InfoPropietario;