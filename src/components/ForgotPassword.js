import React, {useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {db} from "../components/firebase";
import { set, ref } from "firebase/database";
import { auth as fireBaseAuth } from "../components/firebase";
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"
import { useAuth } from "../components/auth";
import { Alert } from "react-bootstrap";


function ForgotPassword() 
{
  const { resetPassword } = useAuth();


  const[email, setEmail] = useState("");
  const submit = useState("Reset Password");
  const [isMouseOver, setMouseOver] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  };



  const reset = async () => {
    try{
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      //if there exists an account for the email provided a reset email is sent
      setMessage("check you email to continue reseting your password");
      setEmail("");
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      //need to display these errors to the user so they can fix and retry
      console.log(error.message);
      setError("Failed to Reset Password");
    }
    setLoading(false);
  };


  function handleMouseOver(){
    setMouseOver(true);
  };

  function handleMouseOut(){
    setMouseOver(false);
  };

  return (
    <div className="loginMiddle">
      <img src={backPick} alt="background_Picture" />
      <div className="login">
        <img src={Logo} alt="site icon"></img>
        <p>Password Reset</p>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <input className="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <button disabled={loading} className="registrationButton mt-3" style={{backgroundColor: isMouseOver ? "black": "#369dfc" }} 
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={reset}
        >{submit}</button>
        <div className="mb-1" ><Link to="/"> Log in</Link> </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
