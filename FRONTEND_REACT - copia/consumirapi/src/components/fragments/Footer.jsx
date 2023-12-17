import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/css/img/Logo.jpeg';

export default class App extends Component{
    
    render(){
      return(

        <footer className="py-3 footer">
    <ul className="nav justify-content-center pb-3 mb-3 container">
      <li className="nav-item"><a href="/" className="nav-link px-2 footer-heading">Inicio</a></li>
      <li className="nav-item"><a href="/register" className="nav-link px-2 footer-heading">Registrate</a></li>
      <li className="nav-item"><a href="/nosotros" className="nav-link px-2 footer-heading">Nosotros</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">App</a></li>
    </ul>

    <ul className="nav justify-content-center pb-3 mb-3 container border-bottom">
    <li className="nav-item">
    <div className="px-3">
      <span class="icon fa fa-map"></span>
      <span class="text px-2">Tecsup, Santa Anita, Perú</span>
      </div>
      </li>

      <li className="nav-item">
      <div className="px-3">
        <span class="icon fa fa-phone"></span>
        <span class="text px-2">+51 999 999 999</span>
        </div>
        </li>

    <li className="nav-item">
      <div className="px-3">
      <span class="icon fa fa-paper-plane"></span>
      <span class="text px-2">info@uywalky.com</span>
      </div>
      </li>
    </ul>
    
    <p class="text-center">&copy; 2023 UYWALKY</p>
  </footer>
      
      )
    }
  }