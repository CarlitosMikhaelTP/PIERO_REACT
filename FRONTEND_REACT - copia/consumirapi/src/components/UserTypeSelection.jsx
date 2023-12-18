import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import banner from '../assets/css/img/perro1.jpg';
import paseador from '../assets/css/img/paseador.jpg';
import propietario from '../assets/css/img/Propietario.jpg';

import '../assets/css/register.css'
import NewNavbar from "./fragments/NewNavbar";
import Footer from "./fragments/Footer"

import '../assets/css/superboton.css';
import '../assets/css/register.css';

import '../assets/css/Dashboard.css';


const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (typeId) => {
    // Almacena el tipo de usuario seleccionado
    localStorage.setItem('selectedType', typeId);

    // Redirige a la página de registro
    navigate('/register');
  };

  return (
    <React.Fragment>
      
  <NewNavbar></NewNavbar>
      {/* Construccion de los botones para seleccionar el tipo de usuario */}
    <div className="container-fluid">
      <div className="py-3 rounded-4 text-center">
      
      <section id="banner3">

          <div className="contenedor3 row">

              <div className="text-center col-md-12" style={{padding: '40px'}}>
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'#FFF'}} >
                    <p>¿QUÉ TIPO DE USUARIO SERÁS?</p>
                    </div>
                </div>
                <div className="row marco3">
                  <h4 style={{color:'white'}}>
                  Puedes registrarte tanto como un propietario de mascotas, para consumir el servicio, o
                  convertirte en un paseador de mascotas, ofreciendo el servicio.
                  </h4>
                </div>
              </div>

        </div>

        <div className="opacidad3">
            <img src={banner} class="d-block " alt=""/>
          </div>
        </section>

      <div className="row mt-3">
        <div className="col-md-6 py-3 fadeInDown">
            <button onClick={() => handleTypeSelection(1)} style={{overflow: 'hidden', width: '80%'}} className="sombra">
                <img src={propietario} alt="" className="w-75 h-auto rounded-4" style={{ objectFit: 'cover', transform: 'scale(1.3)' }}/>
            </button>
        </div>
        <div className="col-md-6 py-3 fadeInDown">
            <button onClick={() => handleTypeSelection(2)} style={{overflow: 'hidden', width: '80%'}} className="sombra">
                <img src={paseador} alt="" className="w-75 rounded-4" style={{ objectFit: 'cover', transform: 'scale(1.3)' }}/>
            </button>
        </div>
        </div>
    </div>
</div>

        <div className="row" style={{width:'100%'}}>
        <div className="text-center col-md-6" style={{padding: '40px'}}>
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'black'}} >
                    <p>Propietario</p>
                    </div>
                </div>
              </div>

              <div className="text-center col-md-6" style={{padding: '40px'}}>
                <div className="row py-2">
                  <div style={{fontSize:'50px', color:'black'}} >
                    <p>Propietario</p>
                    </div>
                </div>
              </div>
              </div>

    <Footer></Footer>
    </React.Fragment>
  );
};

export default UserTypeSelection;
