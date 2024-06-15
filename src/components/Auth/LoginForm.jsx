import React, { useState } from "react";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/auth";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    console.log('submit')

    try {
      const response = await loginRequest(formData);
      if (response.data.success) {
        console.log("Login successful:", response.data);
        login(response.data.user);
        navigate("/buzon");
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form_login card bg-dark px-2 py-3">
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

export default Login;
