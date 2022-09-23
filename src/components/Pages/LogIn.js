import React from "react";
import { useNavigate } from "react-router-dom";

//just testing navigation with buttons, feel free to remove button
function LogIn() 
{
  let navigate = useNavigate();

  return (
    <div>
      <h1>This is the login page</h1>
      <button onClick={() => {
        navigate("/")
      }}>Back to Registration</button>
    </div>
  );
}

export default LogIn;