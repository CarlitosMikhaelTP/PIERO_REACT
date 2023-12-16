//Anotacion jsx para crear los componentes
//Importando el Css para el Login
import '../assets/css/Login.css';
import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/css/img/perro.png';
import { Apiurl } from '../services/apirest';

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

                if (token && idTipoUsuario && id) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("idTipoUsuario", idTipoUsuario);
            localStorage.setItem("id", id); // ALmacenando el ID del usuario
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
    }

    render() {
        if (this.state.redirectToDashboard) {
            const redirectTo = this.state.idTipoUsuario === 1 ? "/index_dueno" : "/index_paseador";
            return <Navigate to={redirectTo} />;
        }

        return (
            <React.Fragment>
                <div className="row" style={{ width: '100%' }}>
                <div className="wrapper fadeInDown col-12">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src={logo} id="icon" alt="User Icon" />
                        </div>
                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="email" placeholder="Ingresa tu Email" onChange={this.manejadorChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="ENTRAR" onClick={this.manejadorBoton} />
                        </form>
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
