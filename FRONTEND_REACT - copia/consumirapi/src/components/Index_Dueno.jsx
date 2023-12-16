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

//Crear una clase que herede de React Component
class Index_Dueno extends React.Component{
    //creamos metodo render que retornara los elementos html
    render(){
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
                        <a className="nav-link" href="#">Registrar Mascota</a>
                      </li>
                      <li className="nav-item">
                        <Link to="/configurar-propietario" className="nav-link" href="#">Registrar como paseador</Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Buscar Paseador</a>
                      </li>
                    </ul>
                  </div>
</nav>
</React.Fragment>
    );
    }
}
 // Exportamos la clase para que la podamos usar
 export default Index_Dueno
 