import React from "react";
import "./ButtonsGroup.css";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { useAuth } from "../../context/AuthContext";

const ButtonsGroup = () => {
  const { isAuth, logout } = useAuth();

  return (
    <div className="buttons_group">
      {isAuth ? (
        <>
          <Link to="/buzon" className="button">
            Buzon
          </Link>
          <Link to="/contactos" className="button">
            Contactos
          </Link>
          <Link to="/perfil" className="button">
            Perfil
          </Link>
          <Link to="/ajustes" className="button">
            Ajustes
          </Link>
          <Link
            to="/"
            onClick={() => {
              logout();
            }}
            className="button"
          >
            💨
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="button">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="button">
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
};

export default ButtonsGroup;
