import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/css/img/Logo.jpeg';
import '../../assets/styles/style.css';
import '../../assets/styles/animate.css';
import '../../assets/styles/owl.carousel.min.css';
import '../../assets/styles/owl.theme.default.min.css';
import '../../assets/styles/magnific-popup.css';
import '../../assets/styles/bootstrap-datepicker.css';
import '../../assets/styles/flaticon.css';

export default class App extends Component{
    
    render(){
      return(
        
        <nav class="navbar navbar-expand-lg ftco-navbar-light">
	    <Link className="navbar-brand" to="/" style={{marginLeft: '20px'}}>
	    	<a class="navbar-brand" href="">
			<img src={logo} id="icon" alt="User Icon" className="logo-img rounded-pill mr-3" />UYWALKY</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="fa fa-bars"></span> Menu
	      </button>
          </Link>
        <div className="container">
	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	        	<li className="nav-item"><Link to="/usertypeselection" className="nav-link active">Registrarse</Link></li>
	        	<li className="nav-item"><Link to="/login" className="nav-link active">Iniciar Sesión</Link></li>
	        	<li className="nav-item"><Link to="/nosotros" className="nav-link active">Nosotros</Link></li>
	          <li className="nav-item"><Link to="/" className="nav-link active">Servicios</Link></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
      
      )
    }
  }