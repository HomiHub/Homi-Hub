import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

//just testing navigation with buttons, feel free to remove button
function LogIn() 
{
  let navigate = useNavigate();

  return (
    <div>
      <h1 className="loginWelcome" color="black">This is the login page</h1>
      <button onClick={() => {
        navigate("/registration")
      }}>Registration</button>
    </div>
  );
}

export default LogIn;