import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import {db} from "../components/firebase";
import { set, ref } from "firebase/database";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"

function LogIn() 
{
  let navigate = useNavigate();

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const submit = useState("Login");
  const [isMouseOver, setMouseOver] = useState(false);

  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  };

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  };

  const login = async () => {
    try{
      //authenticate login credentials
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/familyHomePage")
      setEmail("");
      setPassword("");
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
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
        <input class="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input class="registrationInput" type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button className="registrationButton" style={{backgroundColor: isMouseOver ? "blue": "#369dfc" }} 
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={login}
        >{submit}</button>
        <p>
          No account?&nbsp;
          <a href="./Registration">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LogIn;