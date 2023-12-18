//Anotacion jsx para crear los componentes
//Llamamos a la librería de React
import React from "react";
//Anotacion jsx para crear los componentes

//servicios
import { Apiurl } from '../services/apirest';
//Importando Axios
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import foto2 from '../assets/css/img/foto2.jpg';
import logo from '../assets/css/img/Logo.jpeg';
import google_play from '../assets/css/img/google_play.png'
import carrusel1 from '../assets/css/img/perro1.jpg';
import carrusel2 from '../assets/css/img/perro2.jpg';
import carrusel3 from '../assets/css/img/perro3.jpg';
import banner1 from '../assets/css/img/banner1.jpg';
import uno from '../assets/css/img/uno.jpg';
import dos from '../assets/css/img/dos.jpg';
import tres from '../assets/css/img/tres.jpg';
import iconoWsp from '../assets/css/img/iconoWsp.png';
import iconoLinkedin from '../assets/css/img/iconoLinkedin.png';
import iconoYoutube from '../assets/css/img/iconoYoutube.png';
import iconoFace from '../assets/css/img/iconoFace.jpg';
import IconoCelular from '../assets/css/img/celular.png';
import Navbar from "./fragments/Navbar";
import NewNavbar from "./fragments/NewNavbar";
import Footer from "./fragments/Footer"


//Imporando clases adicionales
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
import { initMDB, Carousel } from 'mdb-ui-kit'; // Importa initMDB y el componente Carousel de mdb-ui-kit
// Inicializa el componente Carousel de MDB
initMDB({ Carousel });


//Crear una clase que herede de React Component
class Dashboard extends React.Component {
  //creamos metodo render que retornara los elementos html
  render() {
    return (
      <React.Fragment>
        {/* <Navbar></Navbar> */}
        <NewNavbar></NewNavbar>
        {/* AGREGANDO CARROUSEL SOLUCIONAR PROBLEMA DE MOVILIDAD DE CARRUSEL */}

        <section id="banner1">
          <div className="opacidad">
            <img src={banner1} class="d-block" alt="" />
          </div>
          <div className="contenedor">
            <div style={{backgroundColor:'#fd8e0fa9'}}>
            <h2>UYWALKY LLEGÓ A PERÚ</h2>
            
            <h5>La tranquilidad de tu mascota es nuestra prioridad</h5>
            </div>
          </div>
        </section>

      {/* Cómo funciona UyWalky */}

        <section class="ftco-no-pt ftco-intro" style={{marginTop:'35px', marginBottom:'40px'}}>
          <div class="container">
            <div class="row">

              <div class="col-md-4 d-flex align-self-stretch px-4">
                <div class="d-block services text-center">
                  <div class="icon d-flex align-items-center justify-content-center">
                    <span class="flaticon-customer-service"></span>
                  </div>
                  <div class="media-body">
                    <h3 class="heading">BUSCA</h3>
                    <p>Busca y contacta con cuidadores de confianza y con experiencia cerca de ti</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex align-self-stretch px-4">
                <div class="d-block services text-center">
                  <div class="icon d-flex align-items-center justify-content-center">
                    <span class="flaticon-stethoscope"></span>
                  </div>
                  <div class="media-body">
                    <h3 class="heading">RESERVA</h3>
                    <p>Encuentra al cuidador ideal y reserva un paseo con tus condiciones</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex align-self-stretch px-4">
                <div class="d-block services text-center">
                  <div class="icon d-flex align-items-center justify-content-center">
                    <span class="flaticon-blind"></span>
                  </div>
                  <div class="media-body">
                    <h3 class="heading">LISTO</h3>
                    <p>Tu mascota estará en buenas manos mientras no estás</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

         {/* BENEFICIOS POR USAR UyWalky */}

         {/*
         <div class="franja-naranja">
          <h2 style={{textDecoration:'underline'}}>BENEFICIOS DE UYWALKY</h2>
          </div>

           */}
           
           <Link to="/usertypeselection" className="nav-link active">
            <div className="centrado">
              <button class="btn draw-border">UNETE A UYWALKY</button>
            </div>
            </Link>

           {/* banner de servicios */}

          <section id="banner2">

          <div className="contenedor">
        <div className="row" style={{width:'100%'}}>
          <div className="col-md-5"></div>

          <div className="col-md-7">
          <div className="container-fluid">
            <div className="row px-5">

              <div className="col-md-6 text-center py-4">
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'#FE2D2D'}} >
                    <i class="fa-solid fa-users d-block w-25 mx-auto"></i></div>
                </div>
                <div className="row marco2">
                  <h4 style={{color:'white'}}>+235.000 opiniones excelentes de otros dueños de perros</h4>
                </div>
              </div>
              <div className="col-md-6 text-center py-4">
                <div className="row py-2">
                <div style={{fontSize:'50px', color:'#FE2D2D'}} >
                    <i class="fa-solid fa-map-location-dot d-block w-25 mx-auto"></i></div>
                </div>
                <div className="row marco2">
                  <h4 style={{color:'white'}}>Mira donde está tu mastoca en tiempo real</h4>
                </div>
              </div>
              </div>
              <div className="row px-5">

              <div className="col-md-6 text-center py-4">
                <div className="row py-2">
                <div style={{fontSize:'50px', color:'#FE2D2D'}} >
                    <i class="fa-solid fa-shield-heart d-block w-25 mx-auto"></i></div>
                </div>
                <div className="row marco2">
                  <h4 style={{color:'white'}}>Seguridad garantizada para tu mascota</h4>
                </div>
              </div>
              <div className="col-md-6 text-center py-4">
                <div className="row py-2">
                <div style={{fontSize:'50px', color:'#FE2D2D'}} >
                    <i class="fa-regular fa-circle-check d-block w-25 mx-auto"></i></div>
                </div>
                <div className="row marco2">
                  <h4 style={{color:'white'}}>Super intuitivo y fácil de usar</h4>
                </div>
              </div>
            </div>
          </div>
          </div>

        </div>
        </div>

        <div className="opacidad">
            <img src={foto2} class="d-block " alt=""/>
          </div>
        </section>

      {/* PREGUNTAS FRECUENTES */}

        <section class="ftco-section bg-light ftco-faqs">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 order-md-last">
                <div class="img img-video d-flex align-self-stretch align-items-center justify-content-center 
            justify-content-md-center mb-4 mb-sm-0" style={{ backgroundImage: `url(${logo})` }}>
                </div>
              </div>

      <div className="col-lg-6">
      <div className="heading-section mb-3 mt-5 mt-lg-0">
        <h2 className="mb-3">Preguntas Frecuentes</h2>
      </div>
      <div id="accordion" className="myaccordion w-100" aria-multiselectable="true">

        <div className="card">
          <div className="card-header p-0" id="headingOne">
            <h2 className="mb-0">
              <button className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <p className="mb-0">¿UyWalky es adecuado para mi perro?</p>
                <i className="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div className="collapse show" id="collapseOne" role="tabpanel" aria-labelledby="headingOne">
            <div className="card-body py-3 px-0">
              <ol>
              Creemos que todos los perros deberían recibir cuidados de personas 
              cariñosas que les brinden atención personalizada, numerosos paseos, 
              momentos de juego y afecto. Si estás buscando lo mismo para tu perro, 
              UyWalky te ofrece la posibilidad de buscar, descubrir y reservar al cuidador ideal.
              </ol>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header p-0" id="headingTwo" role="tab">
            <h2 className="mb-0">
              <button className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" 
              data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <p className="mb-0">¿Son seguros los cuidadores de UyWalky?</p>
                <i className="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div className="collapse" id="collapseTwo" role="tabpanel" aria-labelledby="headinTwo">
            <div className="card-body py-3 px-0">
            <ol>
            Nos comprometemos a proporcionar un entorno seguro para la comunidad UyWalky. 
            Todos los cuidadores pasan por un riguroso proceso de selección con el equipo de 
            confianza y seguridad de UyWalky. Los perfiles de UyWalky muestran la experiencia, las cualificaciones, el 
            entorno del hogar y la zona del cuidador, así como las calificaciones y los comentarios 
            de otros dueños/as de perros. Las reservas realizadas a través de UyWalky también están 
            cubiertas por nuestros Términos de Servicio, que incluyen atención veterinaria para proteger 
            a tu perro en caso de accidente o emergencia durante cualquier reserva.
              </ol>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header p-0" id="headingThree">
            <h2 className="mb-0">
              <button className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" 
              data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <p className="mb-0">¿Puedo conocer al cuidador antes de una reserva?</p>
                <i className="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div className="collapse" id="collapseThree" role="tabpanel" aria-labelledby="headingThree">
            <div className="card-body py-3 px-0">
              <ol>
              ¡Por supuesto! Siempre recomendamos organizar un encuentro antes de la reserva. 
              Esta es una oportunidad para ver el entorno de la casa y conocer a las mascotas que 
              viven allí y comentar detalles importantes con el cuidador como; rutina de comidas, 
              problemas médicos o de comportamiento, y los horarios de paseo.
              </ol>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header p-0" id="headingFour">
            <h2 className="mb-0">
              <button className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" 
              data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                <p className="mb-0">¿Cómo puedo pagar una reserva?</p>
                <i className="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div className="collapse" id="collapseFour" role="tabpanel" aria-labelledby="headingFour">
            <div className="card-body py-3 px-0">
              <ol>
              Una vez que hayas encontrado al 
              cuidador perfecto para tu perro, UyWalky hará que 
              el pago sea sencillo. Aceptamos las principales tarjetas de 
              crédito/débito, SOFORT y Giropay. El importe se cargará una vez 
              que se confirme la reserva, y tendrás la oportunidad de hablar y conocer 
              al cuidador antes de la reserva. Todas las reservas de UyWalky incluyen un 
              reembolso del 100% en cualquier momento hasta 3 días antes del inicio de la reserva. 
              ¡Nunca realices el pago en efectivo! Esto pone en riesgo a ti y a tu perro y vulnera 
              los Términos de Servicio de UyWalky.
              </ol>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header p-0" id="headingFive">
            <h2 className="mb-0">
              <button className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link" 
              data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                <p className="mb-0">¿Puedo cancelar una reserva?</p>
                <i className="fa" aria-hidden="true"></i>
              </button>
            </h2>
          </div>
          <div className="collapse" id="collapseFive" role="tabpanel" aria-labelledby="headingFive">
            <div className="card-body py-3 px-0">
              <ol>
              ¡Sí, por supuesto! Entendemos que los planes pueden cambiar, por eso todas las reservas de 
              UyWalky tienen un reembolso del 100% en cualquier momento hasta 3 días antes del inicio de una 
              reserva.
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

            </div>
          </div>
        </section>

        {/* INIVTACION A USAR EL APLICATIVO DEL CELULAR */}

  <div className="position-relative">
  <div className="text-white p-5 d-flex align-items-center banner-app">
  <div className="position-absolute">
      <img src={IconoCelular} className="img-fluid" alt="" style={{ maxWidth:'42%' }}/>
    </div>
    <div className="col-md-12" id="mobile">
      <h1 style={{textAlign:'right'}}>Descarga la Aplicación de UyWalky</h1>

      <div className="contenedor-app">
      <div id="mobile" className="marco-container d-flex justify-content-end">
      <div className="marco d-flex align-items-center">
      <div><i class="fa-solid fa-magnifying-glass-location"></i></div>
      <div>
      <h3>Busca cuidadores con <br />experiencia cerca de ti</h3>
      </div></div></div>
      <div id="mobile" className="marco-container d-flex justify-content-end">
      <div className="marco d-flex align-items-center">
      <div><i class="fa-solid fa-dog"></i></div>
      <div>
      <h3>Encuentra el cuidador <br /> perfecto para tu perro</h3>
      </div></div></div>
      </div>

      <div className="contenedor-app">
      <div id="mobile" className="marco-container d-flex justify-content-end">
      <div className="marco d-flex align-items-center">
      <div><i class="fa-solid fa-comments"></i></div>
      <div>
      <h3>Mensajes y Reserva</h3>
      </div></div></div>
      <div id="mobile" className="marco-container d-flex justify-content-end">
      <div className="marco d-flex align-items-center">
      <div><i class="fa-solid fa-camera"></i></div>
      <div>
      <h3>Recibe fotos y <br />actualizaciones</h3>
      </div></div></div>
      </div>
      <div id="mobile" className="marco-container d-flex justify-content-end">
      <img src={google_play} alt="" style={{width:'300px'}}/>
      </div>
    </div>
  </div>
</div>

<br />
<br />
<br />
<br />
      <Footer></Footer>
      </React.Fragment>
    );
  }
}
// Exportamos la clase para que la podamos usar
export default Dashboard
