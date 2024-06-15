import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { verifyTokenRequest } from '../api/auth';
// import axios from 'axios';
// import { API_URL } from '../api/api_url';
// axios.defaults.withCredentials = true;

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const login = (userData) => {
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    Cookies.remove('token'); // Eliminar la cookie en el logout
  };
  
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      console.log('check login: ' + cookies.token)
      // const token = Cookies.get('token');
      // console.log(token)

      if (!cookies.token) {    
            setIsAuth(false)
            setLoading(false)
            return setUser(null)
      }
        try {
          const res = await verifyTokenRequest(cookies.token);
          console.log(res.data.username)
          if (!res.data){
            setIsAuth(false);
            setLoading(false)
            return
          } 

          setIsAuth(true);
          setUser(res.data);
          setLoading(false)
        } catch (error) {
          setIsAuth(false);
          setUser(null);
          setLoading(false)
        }

    }

    checkLogin();
  }, [isAuth]);


  return (
    <AuthContext.Provider value={{ user, setIsAuth, isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
