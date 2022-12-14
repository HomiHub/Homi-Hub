import React, {useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css"
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"
import { useAuth } from "../components/auth";
import { Alert } from "react-bootstrap";
import useUploadLocation from "../gpsTracker/uploadLocation";

function LogIn() 
{
  const { signin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/family-homepage';

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const submit = useState("Login");
  const [isMouseOver, setMouseOver] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  };

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  };


  const login = async () => {
    try{
      setError("");
      setLoading(true);
      //authenticate login credentials
      let userCred = await signin(email, password);
      //if the user successfully logged in, they send to the family home page for now
      //needs to be updated to choose which family they want to view.
      navigate(redirectPath, {replace: true})
      setEmail("");
      setPassword("");
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      //need to display these errors to the user so they can fix and retry
      console.log("this error ", error.message);
      setError(error.message);
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
        <p>Get together online as a family!</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <input className="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input className="registrationInput" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button disabled={loading} className="registrationButton" style={{backgroundColor: isMouseOver ? "black": "#369dfc" }} 
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={login}
        >{submit}</button>
        <div className="mb-1" ><Link to="/forgot-password"> Forgot Password?</Link> </div>
        <p>
          No account?&nbsp;
          <Link to="./registration">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
