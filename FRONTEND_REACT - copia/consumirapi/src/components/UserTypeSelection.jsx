import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import iconoWsp from '../assets/css/img/iconoWsp.png';
import paseador from '../assets/css/img/paseador.jpg';
import propietario from '../assets/css/img/Propietario.jpg';

import '../assets/css/register.css'

import NewNavbar from "./fragments/NewNavbar";


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
      {/* <Navbar></Navbar>*/}
      {/* Construccion de los botones para seleccionar el tipo de usuario */}
    <div className="container-fluid">
      <div className="py-3 rounded-4 text-center">
        <div className="h2 bg-body-secondary text-bg-light py-2">
            Selecciona el tipo de usuario al que quieres pertenecer
        </div>

      <div className="row">
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

    </React.Fragment>
  );
};

export default UserTypeSelection;
