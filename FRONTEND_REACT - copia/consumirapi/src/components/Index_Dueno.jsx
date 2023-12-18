//Anotacion jsx para crear los componentes
//Llamamos a la librería de React
import React from "react";
//Anotacion jsx para crear los componentes
//servicios
import {Apiurl} from '../services/apirest'; 
//Importando Axios
import axios from 'axios';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../assets/css/img/Logo.jpeg'
import mapa1 from '../assets/css/img/mapa1.jpg'

import NavbarDueno from './fragments/NavbarDueno'
import Footer from './fragments/Footer'

import '../assets/css/Index_Dueno.css'
import '../assets/css/sidebars.css'
import '../assets/js/sidebars.js'
import '../assets/css/superboton.css'
import '../assets/js/adicionales.js'

//Crear una clase que herede de React Component
class Index_Dueno extends React.Component{
  //creamos metodo render que retornara los elementos html
  constructor(props) {
    super(props);
    this.state = {
      TextVisible: false,
    };
  }

  toggleText = () => {
    this.setState((prevState) => ({
      TextVisible: !prevState.TextVisible,
    }));
  };
  
  render(){
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

        <Link className="navbar-brand" to="/" style={{marginLeft: '10px'}}>
	    	<a class="navbar-brand" href=""><i class="fa-solid fa-angle-left"></i> Página principal</a>
          </Link>
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

      <div className="col-md-9 text-center py-3">
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
    <Footer></Footer>
    </React.Fragment>
    );
    }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Dueno
 