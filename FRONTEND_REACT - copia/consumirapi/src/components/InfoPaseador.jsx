import React from "react";
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from './fragments/EditModal'; 
import NavbarPaseador from './fragments/NavbarPaseador';
import Footer from './fragments/Footer';

import '../assets/css/Index_Dueno.css'
import '../assets/styles/style.css';
import '../assets/css/register.css'

class InfoPaseador extends React.Component {
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
        profileCreated: false,
      },
      showModal: false,
      mapInitialized: false,
      initialRegistration: false,
      showSuccessModal: false,
      paseadorInfo: null,
      loadingPaseadorInfo: true,
      showSuccessModal: false,
      showEditModal: false,
    };
  }

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

  async checkProfileExistence(IdPaseador) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/paseador/findPaseadorById/${IdPaseador}`);
      if (response.data) {
        this.setState({ profileCreated: true });
      }
    } catch (error) {
      console.error('Error al verificar la existencia del perfil:', error);
    }
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    if (name === 'idCategoria') {
      const selectedCategoria = fieldValue;
      const { categorias, tarifas } = this.state;

      const selectedCategory = categorias.find(
        (categoria) => categoria.nombre === selectedCategoria
      );

      const selectedCategoryId = selectedCategory ? selectedCategory.id : '';
      const tarifa = tarifas[selectedCategoria] || '';

      this.setState((prevState) => ({
        selectedCategoria,
        formData: {
          ...prevState.formData,
          idCategoria: selectedCategoryId,
          tarifa,
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
    const { categorias, tarifas } = this.state;

    const selectedCategory = categorias.find(
      (categoria) => categoria.nombre === selectedCategoria
    );

    const selectedCategoryId = selectedCategory ? selectedCategory.id : '';
    const tarifa = tarifas[selectedCategoria] || '';

    this.setState((prevState) => ({
      selectedCategoria,
      formData: {
        ...prevState.formData,
        idCategoria: selectedCategoryId,
        tarifa,
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
        window.location.reload();
      });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  handleCloseModal = async() => {
    const { descripcion, experiencia, idCategoria } = this.state.formData;
    const idPaseador = localStorage.getItem('idPaseador');
    const someUpdate = {
      descripcion,
      experiencia,
      idCategoria,
    };
    try {
      await axios.put(`http://localhost:8080/api/v1/paseador/edit/${idPaseador}`, someUpdate);
    } catch(error) {
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
      <div className="text-center">

        {/*
        <p>Nombre: {paseadorInfo.nombres}</p>
        <p>Apellidos: {paseadorInfo.apellidos}</p>
        <p>Categoría: {paseadorInfo.categoriaNombre}</p>
        <p>Descripción: {paseadorInfo.descripcion}</p>
        <p>Experiencia: {paseadorInfo.experiencia}</p>
        <p>Tarifa: {paseadorInfo.tarifa}</p>
        <p>Saldo: {paseadorInfo.saldo}</p>
        */}

        <section className="mt-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="wrapper">
              <div className="row no-gutters sombra">
                <div className="col-md-12">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                  <h2 className="mb-4">Información de {paseadorInfo.nombres}</h2>
                    <form id="contactForm" name="contactForm" class="contactForm">
                      <div className="row">

                      <div className="col-md-11 mx-auto">
                          <div className="form-group">
                          {paseadorInfo.foto && (
                            <div className="">
                                <label className="label" htmlFor="direccion">Foto:</label>
                                <br />
                                <img src={`http://localhost:8080/api/v1/paseador/foto/${paseadorInfo.idPaseador}`} 
                                alt="Foto del paseador"
                                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}/>
                              </div>
                            )}
                          </div>
                        </div>

                      <div className="col-md-11">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Descripción</label>
                            <textarea type="text" className="form-control" placeholder={paseadorInfo.descripcion} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div data-mdb-input-init className="form-group">
                            <label className="label" htmlFor="nombres">Nombres</label>
                            <input type="text" className="form-control" placeholder={paseadorInfo.nombres} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" placeholder={paseadorInfo.apellidos} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="label" htmlFor="edad">Categoria</label>
                            <input type="number" className="form-control" placeholder={paseadorInfo.categoriaNombre} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="label" htmlFor="edad">Tarifa</label>
                            <input type="number" className="form-control" placeholder={paseadorInfo.tarifa} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="label" htmlFor="edad">Saldo</label>
                            <input type="number" className="form-control" placeholder={paseadorInfo.saldo} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Experiencia</label>
                            <input type="text" className="form-control" placeholder={paseadorInfo.experiencia} style={{ textAlign: 'left' }} disabled/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <Button variant="primary" onClick={this.handleModalEditarCampos}>Editar Campos</Button>
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
    const { categorias, selectedCategoria, formData, showModal, profileCreated } = this.state;

    if (!profileCreated || showModal) {
      return (
        <React.Fragment>
          <Modal show={showModal || !profileCreated} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Cuéntanos más de ti</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
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
                  <label htmlFor="tarifa">La tarifa por tu servicio varía según tu categoría</label>
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

                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <NavbarPaseador></NavbarPaseador>
        {this.renderPaseadorInfo()}

        {/* Mostrar el modal de edición */}
        <EditModal
          show={this.state.showEditModal}
          handleClose={() => this.setState({ showEditModal: false })}
          idPaseador={localStorage.getItem('idPaseador')}
        />
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default InfoPaseador;