// import "./Contactos.css";

// const FormAgregarContacto = () => {

//   return (
//     <div className="chat_content d-flex align-items-center">
//       <form className="form col-6 mx-auto">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Usuario a agregar"
//         />
//         <button className="btn btn-primary w-100 mt-1">Agregar</button>
//       </form>
//     </div>
//   );
// };

// export default FormAgregarContacto;


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

  // Función para manejar clic en el botón "Agregar"
  // const handleAgregarClick = (e) => {
  //   e.preventDefault();
  //   // Envia el nombre de usuario por socket.emit para buscar coincidencias en el servidor
  //   // socket.emit("agregarContacto", { userId, contact});

  //   socket.emit("addContact", { userId, contact});
  //   navigate(`/contactos`);
  // };

  const handleAgregarClick = async (e) => {
    e.preventDefault();

    try {
      const response = await addContactRequest({
        userId,
        contact
      });
      // const response = await axios.post('http://localhost:3001/api/contacts/add', {
      //   userId,
      //   contact
      // });

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



  // useEffect(() => {
  //   // Escuchar el evento 'usuarioEncontrado' emitido por el servidor
  //   socket.on('usuarioEncontrado', (userData) => {
  //     console.log('Usuario encontrado:', userData);
  //   });

  //   // Limpiar el event listener cuando el componente se desmonta
  //   return () => {
  //     socket.off('usuarioEncontrado');
  //   };
  // }, []);

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
