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
import logo from '../assets/css/img/Logo.jpeg';
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
import IconoCelular from '../assets/css/img/celular.jpeg';
import Navbar from "./fragments/Navbar";
import NewNavbar from "./fragments/NewNavbar";


//Imporando clases adicionales
import '../assets/styles/animate.css';
import '../assets/styles/owl.carousel.min.css';
import '../assets/styles/owl.theme.default.min.css';
import '../assets/styles/magnific-popup.css';
import '../assets/styles/bootstrap-datepicker.css';
import '../assets/styles/flaticon.css';
import '../assets/styles/style.css';

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
            <h2>UYWALKY LLEGÓ A PERÚ</h2>
            <h5>La tranquilidad de tu mascota es nuestra prioridad</h5>
          </div>
        </section>

      {/* ómo funciona UyWalky */}

        <div class="franja-naranja">
          <h2>¿CÓMO FUNCIONA UYWALKY?</h2>
        </div>

        <section class="ftco-section ftco-no-pt ftco-intro" style={{marginTop:'150px'}}>
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
                    <p>Encuentra al cuidador adecuado para tu perro y paga online para contar con la cobertura veterinaria</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex align-self-stretch px-4">
                <div class="d-block services text-center">
                  <div class="icon d-flex align-items-center justify-content-center">
                    <span class="flaticon-blind"></span>
                  </div>
                  <div class="media-body">
                    <h3 class="heading">RELÁJATE</h3>
                    <p>Tu perro se divertirá y estará en familia y tú recibirás fotografías regularmente</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div class="franja-naranja">
          <h2>BENEFICIOS DE UYWALKY</h2>

          <div className="container-fluid">
            {/* BENEFICIOS POR USAR UyWalky */}
            <div className="row px-5">
              <div className="row col-md-12 mt-2">
              </div>
              <div className="col-md-3 text-center py-4">
                <div className="row py-2">
                  <img src={iconoWsp} class="d-block w-25 mx-auto" alt="Canyon at Nigh" />
                </div>
                <div className="row">
                  <h4>+235.000 opiniones excelentes de otros dueños de perros</h4>
                </div>
              </div>
              <div className="col-md-3 text-center py-4">
                <div className="row py-2">
                  <img src={iconoLinkedin} class="d-block w-25 mx-auto" alt="Canyon at Nigh" />
                </div>
                <div className="row">
                  <h4>Cobertura veterinaria con cada reserva</h4>
                </div>
              </div>
              <div className="col-md-3 text-center py-4">
                <div className="row py-2">
                  <img src={iconoFace} class="d-block w-25 mx-auto" alt="Canyon at Nigh" />
                </div>
                <div className="row">
                  <h4>Cancelaciones gratuitas y garantía de devolución</h4>
                </div>
              </div>
              <div className="col-md-3 text-center py-4">
                <div className="row py-2">
                  <img src={iconoYoutube} class="d-block w-25 mx-auto" alt="Canyon at Nigh" />
                </div>
                <div className="row">
                  <h4>Soporte y Ayuda de nuestro equipo de Gudog</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                Creemos que todos los perros deberían ser cuidados por cuidadores cariñosos que les proporcionen 
                atención personalizada, muchos paseos, tiempo de juego y mimos. Si buscas lo mismo para tu 
                perro, Gudog te permite buscar, encontrar y reservar el cuidador perfecto.
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
            Nos comprometemos a proporcionar un entorno seguro para la comunidad Gudog. Todos los cuidadores 
            pasan por un estricto proceso de selección con el equipo de confianza y seguridad de Gudog, y 
            solo el 15% de los solicitantes son finalmente aprobados. Los perfiles de Gudog muestran la 
            experiencia, las cualificaciones, el entorno del hogar y la zona del cuidador, así como las 
            calificaciones y los comentarios de otros dueños/as de perros. Las reservas realizadas a través 
            de Gudog también están cubiertas por nuestros Términos de Servicio, incluyendo la atención 
            veterinaria para proteger a tu perro en caso de accidente o emergencia durante cualquier reserva.
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
              Una vez que hayas encontrado al cuidador perfecto para tu perro, Gudog hará que el pago 
              sea sencillo. Aceptamos las principales tarjetas de crédito / débito, SOFORT y Giropay. 
              El importe se cargará una vez que se confirme la reserva y podrás hablar y conocer al 
              cuidador antes de la reserva. Todas las reservas de Gudog incluyen un reembolso del 100% 
              en cualquier momento hasta 3 días antes del inicio de la reserva.¡Nunca realices el pago 
              en efectivo! Esto pone en riesgo a ti y a tu perro y vulnera los Términos de servicio de Gudog.
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
              Gudog tienen un reembolso del 100% en cualquier momento hasta 3 días antes del inicio de una 
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
      <img src={IconoCelular} className="img-fluid" alt="" style={{ maxWidth:'50%' }}/>
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

    </div>
  </div>
</div>

<br />
<br />
<br />
<br />

  <footer className="py-3 my-4 footer">
    <ul className="nav justify-content-center pb-3 mb-3 container">
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 footer-heading">About</a></li>
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
        <span class="text px-2">+2 392 3929 210</span>
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


      </React.Fragment>
    );
  }
}
// Exportamos la clase para que la podamos usar
export default Dashboard
