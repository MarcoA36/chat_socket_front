// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// const PrivateRoutes = () => {
//   const { isAuth } = useAuth();
//   console.log(isAuth)


//   if (!isAuth) return <Navigate to="/login" replace/>;
//   return <Outlet/>
// };

// export default PrivateRoutes;



// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// const PrivateRoutes = () => {
//   const { loading, isAuth } = useAuth();
//   console.log(loading, isAuth)

//   if (loading) return <h1>Loading...</h1> 

//   if (!loading && !isAuth) return <Navigate to="/login" replace/>;
//   return <Outlet/>
// };

// export default PrivateRoutes;



import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { loading, isAuth } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoutes;
