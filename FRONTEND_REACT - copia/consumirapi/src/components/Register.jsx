import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useHistory desde react-router-dom
import axios from 'axios';
// Initialization for ES Users
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { Link } from "react-router-dom";  
import logo from '../assets/css/img/Logo.jpeg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Imporando clases adicionales

import '../assets/styles/animate.css';
import '../assets/styles/owl.carousel.min.css';
import '../assets/styles/owl.theme.default.min.css';
import '../assets/styles/magnific-popup.css';
import '../assets/styles/bootstrap-datepicker.css';
import '../assets/styles/flaticon.css';
import '../assets/styles/style.css';
import '../assets/css/register.css'

import NewNavbar from "./fragments/NewNavbar";
initMDB({ Input, Ripple });

function Register() {
  const navigate = useNavigate(); // Obtiene la instancia de history
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
    tipoUsuarioId: localStorage.getItem('selectedType'), // Obtiene el tipo de usuario seleccionado de LocalStorage
  });

  const getTipoUsuarioTexto = () => {
    const tipoUsuarioId = parseInt(formData.tipoUsuarioId, 10); // Asegúrate de que sea un número
    switch (tipoUsuarioId) {
      case 1:
        return 'DUEÑO';
      case 2:
        return 'PASEADOR';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      console.log('Respuesta del servidor:', response.data);
      if (response.status === 200){
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      // Manejo de las Excepciones
    }
  };

  return (

    /* CREACION DEL NAVBAR */
    <React.Fragment>
    <NewNavbar></NewNavbar>
 
    {/* CREACION DEL REGISTRO */}
      
    <section className="mt-5">
      <div className="container">

        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-2">
            <h2 className="heading-section">REGISTRO PARA:</h2>
            <h1>{getTipoUsuarioTexto()}</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row no-gutters sombra">
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                  <h3 className="mb-4">Datos personales</h3>
                    <form onSubmit={handleSubmit} id="contactForm" name="contactForm" class="contactForm">
                      <div className="row">

                        <div className="col-md-6">
                          <div data-mdb-input-init className="form-group">
                            <label className="label" htmlFor="nombres">Nombres</label>
                            <input type="text" className="form-control" name="nombres" id="nombres" placeholder="Nombres" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="apellidos">Apellidos</label>
                            <input type="text" className="form-control" name="apellidos" id="apellidos" placeholder="Apellidos" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label className="label" htmlFor="edad">Edad</label>
                            <input type="number" className="form-control" name="edad" id="edad" placeholder="Edad" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <label className="label" htmlFor="direccion">Direccion</label>
                            <input type="text" className="form-control" name="direccion" id="direccion" placeholder="Direccion" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="celular">Celular</label>
                            <input type="text" className="form-control" name="celular" id="celular" placeholder="Celular" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="dni">DNI</label>
                            <input type="number" className="form-control" name="dni" id="dni" placeholder="DNI" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <h3 className="mb-4">Datos de usuario</h3>
                        <div className="col-md-8">
                          <div className="form-group">
                            <label className="label" htmlFor="email">Email</label>
                            <br />
                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={handleChange} tyle={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="label" htmlFor="apodo">Apodo</label>
                            <input type="text" className="form-control" name="apodo" id="apodo" placeholder="Apodo" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="password">Contraseña</label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Contraseña" onChange={handleChange} style={{ textAlign: 'left' }}/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="submit" value="REGISTRARSE" className="btn btn-primary" />
                            <div className="submitting"></div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-5 img" style={{ backgroundImage: `url(${logo})`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </React.Fragment>
  );
}

export default Register;
