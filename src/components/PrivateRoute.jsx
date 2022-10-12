import React from "react";
import { ReactDOM } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

//this method will need to reach to the database or we can find a way to
//pass the token between component to see if the user is logged in
//will be used to conditionally render the private page or redirect to login page if the user
//is not signed in
const useAuth = () => true;

const PrivateRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to= "/"/>;
}

export default PrivateRoute;