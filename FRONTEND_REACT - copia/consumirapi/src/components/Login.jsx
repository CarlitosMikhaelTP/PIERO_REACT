//Anotacion jsx para crear los componentes
//Importando el Css para el Login
import '../assets/css/Login.css';
import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { Apiurl } from '../services/apirest';
import foto1 from '../assets/css/img/foto1.jpeg'  

class Login extends React.Component {
    state = {
        form: {
            "email": "",
            "password": ""
        },
        error: false,
        errorMsg: "",
        redirectToDashboard: false,
        idTipoUsuario: null,
    }

    manejadorSubmit = e => {
        e.preventDefault();
    }

    manejadorChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    manejadorBoton = () => {
        let url = `${Apiurl}/authenticate`;
        axios.post(url, this.state.form)
            .then(response => {
                const token = response.data?.token;
                const idTipoUsuario = response.data?.idTipoUsuario;
                const id = response.data?.id;
                const idPaseador = response.data?.idPaseador;
                const idPropietario = response.data?.idPropietario;
    
                if (token && idTipoUsuario && id) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("idTipoUsuario", idTipoUsuario);
                    localStorage.setItem("id", id); // Almacenando el ID del usuario
    
                    // Verificar y almacenar el ID del paseador o propietario si existe
                    if (idPaseador) {
                        localStorage.setItem("idPaseador", idPaseador);
                    } else if (idPropietario) {
                        localStorage.setItem("idPropietario", idPropietario);
                    } else {
                        // Si no hay ni ID de paseador ni de propietario, limpiar los datos antiguos
                        localStorage.removeItem("idPaseador");
                        localStorage.removeItem("idPropietario");
                    }
    
                    this.setState({ redirectToDashboard: true, idTipoUsuario });
                } else {
                    this.setState({
                        error: true,
                        errorMsg: "Token o ID de usuario no encontrado en la respuesta del servidor."
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMsg: "Ha ocurrido un error inesperado."
                });
            });
    };
    

    render() {
        if (this.state.redirectToDashboard) {
            const redirectTo = this.state.idTipoUsuario === 1 ? "/index_dueno" : "/index_paseador";
            return <Navigate to={redirectTo} />;
        }

        return (
            <React.Fragment>
    <div className="row justify-content-center" style={{ width: '100%' }}>
          <div className="col-md-8">
            <div className="wrapper">
              <div className="row no-gutters sombra fadeInDown mt-5">

              <div className="col-md-5 d-flex align-items-stretch">
                  <div className="info-wrap w-100 p-5 img" style={{ backgroundImage: `url(${foto1})`}}></div>
                </div>
                
                <div className="col-md-7">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                  <h3 className="mb-4">Ingresa</h3>
                    <form  id="contactForm" name="contactForm" class="contactForm" onSubmit={this.manejadorSubmit}>
                      <div className="row">

                        <div className="col-md-10">
                          <div data-mdb-input-init className="form-group has-validation">
                          <input type="text" className="form-control" name="email" placeholder="Ingresa tu Email" onChange={this.manejadorChange} />
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="form-group">
                          <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={this.manejadorChange} />
                          </div>
                        </div>
                        <div className="col-md-16">
                          <div className="form-group">
                          <input type="submit" className="btn btn-primary" value="ENTRAR" onClick={this.manejadorBoton} />
                            <div className="submitting"></div>
                          </div>
                        </div>

                      </div>
                    </form>
                    {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            </React.Fragment>
        );
    }
}

export default Login;
