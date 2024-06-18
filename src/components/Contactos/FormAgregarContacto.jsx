import React, { useState } from 'react';
import "./Contactos.css";
// import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../../api/api_url';
import { addContactRequest } from '../../api/users';

// const socket = io("http://localhost:3001");

const FormAgregarContacto = () => {
  const {user} = useAuth()
  const userId = user.id
  const [contact, setContact] = useState(''); // Estado para almacenar el nombre de usuario
  const navigate = useNavigate();
  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    setContact(e.target.value); // Actualiza el estado con el valor del input
  };

  const handleAgregarClick = async (e) => {
    e.preventDefault();

    try {
      const response = await addContactRequest({
        userId,
        contact
      });
    
      if (response.data.success) {
        console.log('Contacto agregado:', response.data.message);
        navigate(`/contactos`);
      } else {
        console.error('Error al agregar contacto:', response.data.message);
      }
    } catch (error) {
      console.error('Error al agregar contacto:', error.message);
    }
  };



  return (
    <div className="chat_content d-flex align-items-center">
      <form className="form col-6 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Usuario a agregar"
          value={contact}
          onChange={handleInputChange} // Maneja cambios en el input
        />
        <button
          className="btn btn-primary w-100 mt-1"
          onClick={handleAgregarClick} // Maneja clic en el botón "Agregar"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default FormAgregarContacto;
