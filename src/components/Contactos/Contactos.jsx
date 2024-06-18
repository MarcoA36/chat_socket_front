// import "./Contactos.css";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../../context/AuthContext';
// import { usersRequest } from "../../api/users";

// const Contactos = () => {
//   const { user } = useAuth();
//   const userId = user.id;
//   const [contactos, setContactos] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getUsers() {
//       try {
//         const response = await usersRequest(userId);
//         setContactos(response.data);
//       } catch (error) {
//         if (error.response && error.response.status !== 404) {
//           console.error('Error fetching data:', error);
//         }
//       }
//     }
//     getUsers();
//   }, [userId]);

//   const handleClickContacto = (contacto) => {
//     navigate(`/chat/${contacto.id}`);
//   };

//   return (
//     <>
//       <div className="chat_content">
//       <h4 className="text-center sticky">Contactos</h4>
//         <ul className="lista_contactos">
//           {contactos.map((contacto, index) => (
//             <li
//               key={index}
//               className="contacto-item"
//               onClick={() => handleClickContacto(contacto)}
//             >
//               <div className="profile-initial">
//                 {contacto.username.charAt(0).toUpperCase()}
//               </div>
//               <div className="contacto-info">
//                 <div className="contacto-username">{contacto.username}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="buttons_group-contactos">
//         <Link to="/agregar-contacto" className="btn btn-success">
//           Agregar contacto
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Contactos;







import "./Contactos.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { usersRequest } from "../../api/users";

const Contactos = () => {
  const { user } = useAuth();
  const userId = user.id;
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await usersRequest(userId);
        setContactos(response.data);
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error('Error fetching data:', error);
        }
      }
    }
    getUsers();
  }, [userId]);

  const handleClickContacto = (contacto) => {
    // Verifica que contacto tenga un id antes de navegar
    if (contacto && contacto.id) {
      navigate(`/chat/${contacto.id}`);
    } else {
      console.error('Contacto no tiene un id:', contacto);
    }
  };

  return (
    <>
      <div className="chat_content">
        <h4 className="text-center sticky">Contactos</h4>
        <ul className="lista_contactos">
          {contactos.map((contacto, index) => (
            <li
              key={index}
              className="contacto-item"
              onClick={() => handleClickContacto(contacto)}
            >
              <div className="profile-initial">
                {contacto.username.charAt(0).toUpperCase()}
              </div>
              <div className="contacto-info">
                <div className="contacto-username">{contacto.username}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons_group-contactos">
        <Link to="/agregar-contacto" className="btn btn-success">
          Agregar contacto
        </Link>
      </div>
    </>
  );
};

export default Contactos;
