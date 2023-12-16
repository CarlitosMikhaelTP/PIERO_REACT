import React, { useState} from "react";
import axios from "axios";

function RegisterForm(){
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        apodo: '',
        direccion: '',
        edad: '',
        celular: '',
        dni: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // Enviar los datos al backend usando axios
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
            console.log("Respuesta del servidor:", response.data);
            // Maneja el resultado de la solicitud
        }catch(error){
            console.error("Error al enviar datos:", error);
            // Manejar el error en caso de que falle la solicitud
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-column">
                    {/* Campos de la primera columna */}
                    <input type="text" name="firstname" placeholder="First Name" onChange={handleChange}/>
                    <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange}/>
                    <input type="text" name="apodo" placeholder="Nombre de Usuario" onChange={handleChange}/>
                    <input type="text" name="direccion" placeholder="Direccion" onChange={handleChange}/>
                    <input type="number" name="edad" placeholder="Edad" onChange={handleChange}/>
                </div>
                <div className="form-column">
                    {/* Campos de la segunda columna */}
                    <input type="text" name="celular" placeholder="Celular" onChange={handleChange}/>
                    <input type="text" name="dni" placeholder="Dni" onChange={handleChange}/>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                </div>
            </div>
            <button type="submit">
                Register
            </button>
        </form>
    );
}

export default RegisterForm;