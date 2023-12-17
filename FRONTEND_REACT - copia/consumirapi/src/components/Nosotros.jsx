//Anotacion jsx para crear los componentes
//Importando el Css para el Login
import '../assets/css/Login.css';
import React from "react";
import logo from '../assets/css/img/perro.png';
import Carlitos from '../assets/css/img/Carlitos.jpeg';
import spring from '../assets/css/img/spring.png';
import kotlin from '../assets/css/img/kotlin.png';
import react from '../assets/css/img/react.png';
import django from '../assets/css/img/django.png';
import foto3 from '../assets/css/img/foto3.jpg';

import { Apiurl } from '../services/apirest';
import foto1 from '../assets/css/img/foto1.jpeg'  

import '../assets/styles/animate.css';
import '../assets/styles/owl.carousel.min.css';
import '../assets/styles/owl.theme.default.min.css';
import '../assets/styles/magnific-popup.css';
import '../assets/styles/bootstrap-datepicker.css';
import '../assets/styles/flaticon.css';
import '../assets/styles/style.css';
import '../assets/css/superboton.css';
import '../assets/css/register.css';
import '../assets/css/Dashboard.css';

import NewNavbar from './fragments/NewNavbar'
import Footer from './fragments/Footer'

class Nosotros extends React.Component {

    render() {
        return (
            <React.Fragment>
    <NewNavbar></NewNavbar>
        
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row justify-content-center pb-3 mb-3">
          <div className="col-md-7 heading-section text-center">
            <h2>EL EQUIPO DE UYWALKY</h2>
          </div>
          <span className="text-center" style={{fontWeight:'bold', fontSize:''}}>UyWalky fue desarrollado por:</span>
        </div>
        <div className="row">

          <div className="col-md-3">
            <div className="block-7">
              <div className="img" style={{backgroundImage: `url(${Carlitos})` }}></div>
              <div className="text-center p-4">
                <span className="price">
                <span className="texto5">CARLITOS TORRES</span>
                </span>
                <span style={{fontWeight:'bold'}}>carlitos.torres@tecsup.edu.pe</span>
                <img src={spring} style={{maxWidth:'30%', marginTop:'30px'}} alt="" />
                <div className='text center'>
                <i class="fa-brands fa-github icono1"></i>
                <i class="fa-brands fa-linkedin icono1"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="block-7">
              <div className="img" style={{ backgroundImage: `url(${logo})` }}></div>
              <div className="text-center p-4">
                <span className="price">
                <span className="texto5">DELVIN LAREZ</span>
                </span>
                <span style={{fontWeight:'bold'}}>delvin.larez@tecsup.edu.pe</span>
                <img src={kotlin} style={{maxWidth:'30%', marginTop:'30px'}} alt="" />
                <div className='text center'>
                <i class="fa-brands fa-github icono1"></i>
                <i class="fa-brands fa-linkedin icono1"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="block-7">
              <div className="img" style={{ backgroundImage: `url(${logo})` }}></div>
              <div className="text-center p-4">
                <span className="price">
                <span className="texto5">PIERO QUIROZ</span>
                </span>
                <span style={{fontWeight:'bold'}}>piero.quiroz@tecsup.edu.pe</span>
                <img src={react} style={{maxWidth:'35%', marginTop:'30px'}} alt="" />
                <div className='text center'>
                <i class="fa-brands fa-github icono1"></i>
                <i class="fa-brands fa-linkedin icono1"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="block-7">
              <div className="img" style={{ backgroundImage: `url(${logo})` }}></div>
              <div className="text-center p-4">
                <span className="price">
                <span className="texto5">HAROLD CUTTI</span>
                </span>
                <span style={{fontWeight:'bold'}}>harold.cutti@tecsup.edu.pe</span>
                <img src={django} style={{maxWidth:'30%', marginTop:'30px'}} alt="" />
                <div className='text center'>
                <i class="fa-brands fa-github icono1"></i>
                <i class="fa-brands fa-linkedin icono1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        <section id="banner2">

          <div className="contenedor2 row">

              <div className="text-center col-md-7">
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'#FFF'}} >
                    <p>MISION</p>
                    </div>
                </div>
                <div className="row marco3">
                  <h4 style={{color:'white'}}>
                  En UyWalky, nuestra visión es transformar la experiencia de cuidado y paseo de mascotas 
                  en los distritos de Miraflores, San Isidro, Santiago de Surco y Barranco, ofreciendo 
                  un servicio que fusiona la pasión por los animales con la innovación tecnológica y 
                  la responsabilidad estudiantil.
                  </h4>
                </div>
              </div>

              <div className="text-center col-md-5">
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'#FFF'}} >
                    <p>VISION</p>
                    </div>
                </div>
                <div className="row marco3">
                  <h4 style={{color:'white'}}>
                  Convertirnos en la plataforma líder de paseo de mascotas en Lima, reconocida por la 
                  confiabilidad, transparencia y bienestar proporcionado tanto a las mascotas como a sus dueños.
                  </h4>
                </div>
              </div>

        </div>

        <div className="opacidad2">
            <img src={foto3} class="d-block " alt=""/>
          </div>
        </section>

    <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default Nosotros;
