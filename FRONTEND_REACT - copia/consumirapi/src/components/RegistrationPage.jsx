import React, { useState } from "react";
import UserTypeSelection from "./UserTypeSelection";
import RegisterForm from "./RegisterForm";

function RegistrationPage(){
    const [selectedType, setSelectedType] = useState(null);

    const handleTypeSelection = (typeId) => {
        selectedType(typeId);
    };

    return(
        <div>
            <h1>Registro de Usuario</h1>
            <UserTypeSelection handleTypeSelection={handleTypeSelection}></UserTypeSelection>
            <RegisterForm selectedType={selectedType}></RegisterForm>
        </div>
    )
}

export default RegistrationPage;