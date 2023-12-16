//Anotacion jsx para crear los componentes
//Llamamos a la librería de React
import React from "react";
//Crear una clase que herede de React Component
class Nuevo extends React.Component{
    //creamos metodo render que retornara los elementos html
    render(){
        return(
            <div>
                Hola desde Nuevo
            </div>
        );
    }
}
 // Exportamos la clase para que la podamos usar
 export default Nuevo
 