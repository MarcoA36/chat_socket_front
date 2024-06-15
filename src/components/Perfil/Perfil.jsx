import React from "react";
import "./Perfil.css";
import { useAuth } from "../../context/AuthContext";
import { Card } from "react-bootstrap";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="chat_content">
      <Card style={{ width: '18rem', textAlign:"center", margin:"auto", marginTop:"10px" }}>
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
           {user.email}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Perfil;

