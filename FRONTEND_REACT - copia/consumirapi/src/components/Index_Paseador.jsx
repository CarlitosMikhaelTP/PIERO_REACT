import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet'; // Importando Leaflet para el mapa
import 'leaflet/dist/leaflet.css';

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
      },
      showModal: false,
      initialRegistration: true, // Agrega el estado para el registro inicial
      mapInitialized: false, // Agrega un estado para verificar si el mapa se ha inicializado
    };
    this.map = null;
  }


    // Funcionalidades del mapa
    initMap = () => {
      if (!this.state.mapInitialized) {
        // Lógica para inicializar el mapa
        this.map = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  
        this.setState({ mapInitialized: true }); // Actualiza el estado del mapa
      }
    };


    componentDidMount() {
      const userId = localStorage.getItem('id');
    
      if (userId) {
        this.setState(prevState => ({
          formData: {
            ...prevState.formData,
            idUsuario: userId,
          },
        }));
      }
    }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleCategoriaChange = (event) => {
    const selectedCategoria = event.target.value;
    const { categorias, tarifas, formData } = this.state;
  
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
    const { formData, initialRegistration } = this.state;
  
    try {
      if (initialRegistration) {
        // Realiza la petición de registro
        const response = await axios.post('http://localhost:8080/api/v1/paseador/register', formData);
        console.log('Registro exitoso:', response.data);
  
        // Actualiza el estado local con los datos ingresados
        this.setState({
          initialRegistration: false,
          formData: { ...formData }, // Actualiza con los datos del formulario
          showModal: true,
        });
      } else {
        // Si es una actualización...
        const userId = localStorage.getItem('id');
        const response = await axios.put(`http://localhost:8080/api/v1/paseador/edit/${userId}`, formData);
        console.log('Actualización exitosa:', response.data);
        this.setState({ showModal: true });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await axios.put(`http://localhost:8080/api/v1/paseador/edit/${userId}`, this.state.formData);
      console.log('Actualización exitosa:', response.data);
      this.setState({ showModal: true });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  

  handleCloseModal = () => {
    // Ocultar el modal al cerrarlo
    this.setState({ showModal: false });
  };
  



  handleActivateLocation = () => {
    if (this.state.mapInitialized) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 15); // Centra el mapa en la ubicación actual
          L.marker([latitude, longitude]).addTo(this.map); // Agrega un marcador en la ubicación actual
        });
      } else {
        alert('La geolocalización no está disponible en este navegador.');
      }
    } else {
      alert('El mapa aún no se ha inicializado. Espere un momento o actualice la página.');
    }
  };


    //creamos metodo render que retornara los elementos html
    render(){
      const { categorias, selectedCategoria, formData, showModal } = this.state;
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
        <a className="nav-link" href="#">Registrar Datos para Propietario</a>
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
{/* Agregar formulario para registrar un paseador */}
<div className="container-fluid mt-4 col-md-2 offset-md-1">
          <h2>Menú de Paseador</h2>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="disponibilidad">Disponibilidad</label>
            <div className="custom-control custom-switch ">
              <input
                type="checkbox"
                className="custom-control-input"
                id="disponibilidad"
                name="disponibilidad"
                checked={formData.disponibilidad}
                onChange={() =>
                  this.setState((prevState) => ({
                    formData: {
                      ...prevState.formData,
                      disponibilidad: !prevState.formData.disponibilidad,
                    },
                  }))
                }
          />
                <label className="custom-control-label" htmlFor="disponibilidad">
                  {formData.disponibilidad ? 'Activado' : 'Desactivado'}
                </label>
              </div>
            </div>
            {/* Input para la calificación, descripción, etc. */}
            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                type="text"
                className="form-control"
                id="ubicacion"
                name="ubicacion"
                required="Agrega tu ubicación actual"
                value={formData.ubicacion}
                onChange={this.handleInputChange}
              />
            </div>

            
            {/* Ejemplo de campo para la categoría */}
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
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
              <label htmlFor="calificacion">Calificación</label>
              <input
                type="text"
                className="form-control"
                id="calificacion"
                name="calificacion"
                required="Aqui verás global"
                value={formData.calificacion}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Tu descripcion</label>
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
              <label htmlFor="experiencia">Experiencia</label>
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
              <label htmlFor="calificacion">Tarifa</label>
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
              <label htmlFor="saldo">Saldo</label>
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
              Enviar
            </button>

            {/* Botón para actualizar */}
        <button type="button" className="btn btn-success ml-2" onClick={this.handleUpdate}>
          Actualizar
        </button>

        {/* Mapa */}
<div ref={this.mapRef} style={{ height: "300px" }}></div>

{/* Botón para activar la localización */}
<button type="button" className="btn btn-primary" onClick={this.handleActivateLocation}>
  Activar Localización
</button>
          </form>
        </div>
        <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¡Registro exitoso!</h5>
                <button type="button" className="close" onClick={this.handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Te has registrado como paseador con éxito.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
</React.Fragment>
    );
    }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Paseador
 