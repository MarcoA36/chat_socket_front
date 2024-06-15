import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { API_URL } from "../../api/api_url";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Register = () => {
  const { login, setIsAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      console.log(response);
      console.log("Usuario registrado exitosamente");
      setIsAuth(true);
      login(response.data);
      navigate('/chat')
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
    }
  };

  return (
    <div className="register">
      <form
        onSubmit={handleSubmit}
        className="form_login card bg-dark px-2 py-3"
      >
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// const Register = () => {
//   const { signup } = useAuth();
//   const [userData, setUserData] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(userData);
//       // Redirigir al usuario después del registro exitoso, por ejemplo:
//       // history.push("/login");
//     } catch (error) {
//       console.error("Error al registrar usuario:", error);
//     }
//   };

//   return (
//     <div className="register">
//       <form
//         onSubmit={handleSubmit}
//         className="form_login card bg-dark px-2 py-3"
//       >
//         <input
//           type="email"
//           name="email"
//           value={userData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="form-control mb-2"
//         />
//         <input
//           type="text"
//           name="username"
//           value={userData.username}
//           onChange={handleChange}
//           placeholder="Usuario"
//           className="form-control mb-2"
//         />
//         <input
//           type="password"
//           name="password"
//           value={userData.password}
//           onChange={handleChange}
//           placeholder="Contraseña"
//           className="form-control mb-2"
//         />
//         <button type="submit" className="btn btn-secondary">
//           Enviar
//         </button>
//       </form>
//       {/* {errors.length > 0 && (
//         <div className="text-danger">
//           {errors.map((error, index) => (
//             <p key={index}>{error}</p>
//           ))}
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Register;
