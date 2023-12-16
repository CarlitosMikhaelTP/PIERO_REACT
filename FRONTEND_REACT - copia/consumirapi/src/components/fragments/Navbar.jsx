import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/css/img/Logo.jpeg';

export default class App extends Component{
    
    render(){
      return(
        
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            {/* Cambié logo por la variable que contiene el logo */}
            <img src={logo} id="icon" alt="User Icon" className="logo-img rounded-pill" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-3">
                <Link to="/usertypeselection" className="nav-link active">Registrarme</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/login" className="nav-link active">Iniciar Sesión</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/login" className="nav-link active">Acerca de</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/login" className="nav-link active">Servicios</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Busca lo que necesitas !" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
      
      )
    }
  }