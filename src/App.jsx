import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoutes";

import Chat from "./components/Chat/Chat";
import Login from "./components/Auth/LoginForm";
import Register from "./components/Auth/RegisterForm";
import Contactos from "./components/Contactos/Contactos";
import Perfil from "./components/Perfil/Perfil";
import Ajustes from "./components/Ajustes/Ajustes";
import ButtonsGroup from "./components/Buttons/ButtonsGroup";
import FormAgregarContacto from "./components/Contactos/FormAgregarContacto";
import Inbox from "./components/Inbox/Inbox";

function App() {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <div className="chat_container">
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/buzon" element={<Inbox />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/contactos" element={<Contactos />} />
              <Route path="/agregar-contacto" element={<FormAgregarContacto />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/ajustes" element={<Ajustes />} />
            </Route>
          </Routes>

          {isAuth && <ButtonsGroup />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
