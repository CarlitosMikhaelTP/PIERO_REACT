import React from 'react';
import './assets/css/App.css';
//Mandamos a llamar a la librería que descargamos en Boostrap
import "bootstrap/dist/css/bootstrap.css"; 
// Importamos la libreria de ROuter
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
// Importamos el Login
import Login from './components/Login';
// Impotamos componente Dashboard
import Dashboard from './components/Dashboard';
import Nosotros from './components/Nosotros';
import Editar from './components/Editar';
import Nuevo from './components/Nuevo';
import Register from './components/Register';
import TipoUsuarioSelection from './components/TipoUsuarioSelection';
import RegisterForm from './components/RegisterForm';
import RegistrationPage from './components/RegistrationPage';
import UserTypeSelection from './components/UserTypeSelection';
import Index_Dueno from './components/Index_Dueno';
import Index_Paseador from './components/Index_Paseador';
import UserProfile from './components/UserProfile';
import EditUserProfileForm from './components/EditUserProfileForm';
import EditModal from './components/fragments/EditModal';
import PropietariosList from './components/fragments/PropietariosList';
import ModalRegistroPropietario from './components/fragments/ModalRegistroPropietario';
import ModalActualizarPropietario from './components/fragments/ModalActualizarPropietario';
import Modalll from './components/fragments/Modalll';
import PaseadoresList from './components/fragments/PaseadoresList';
import InfoPaseador from './components/InfoPaseador';
import InfoPropietario from './components/InfoPropietario';





function App() {
  return (
    //Usamos la etiqueta propia de React
    <React.Fragment>
      <Router>
        <Routes>
           <Route path='/' element={<Dashboard />} />
           <Route path='/nosotros' element={<Nosotros />} />
           <Route path='/login' element={<Login />} />
           <Route path='/register' element={<Register />} />
           <Route path='/index_dueno' element={<Index_Dueno />} />
           <Route path='/index_paseador' element={<Index_Paseador />} />
           <Route path='/userProfile' element={<UserProfile />} />
           <Route path="/editUserProfile" element={<EditUserProfileForm />} />
           <Route path='/editar' element={<Editar />} />
           <Route path='/EditModal' element={<EditModal />} />
           <Route path='/nuevo' element={<Nuevo />} />
           <Route path='/tipousuarioselection' element={<TipoUsuarioSelection />} />
           <Route path='/usertypeselection' element={<UserTypeSelection />} />
           <Route path='/registerform' element={<RegisterForm />} />
           <Route path='/registrationpage' element={<RegistrationPage />} />
           <Route path='/index_dueno' element={<Index_Dueno />} />
           <Route path='/index_paseador' element={<Index_Paseador />} />
           <Route path='/propietarios_list' element={<PropietariosList />} />
           <Route path='/registerPropietario' element={<ModalRegistroPropietario />} />
           <Route path='/actualizarPropietario' element={<ModalActualizarPropietario />} />
           <Route path='/paseadoresList' element={<PaseadoresList />} />
           
           <Route path='/modal' element={<Modalll/>} />
           <Route path='/buscador'></Route>
           <Route path='/infopaseador' element={<InfoPaseador />} />
           <Route path='/infopropietario' element={<InfoPropietario />} />

        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
