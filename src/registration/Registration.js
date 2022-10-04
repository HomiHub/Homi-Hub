import React, {useState} from "react";
import {db} from "../components/firebase";
import { set, ref } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import "./registration.css"
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"

function Registration() {

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[password2, setPassword2] = useState("");
  const submit = useState("Sign Up Now!");
  const [isMouseOver, setMouseOver] = useState(false);

  const handleFirstNameChange=(e)=>{
    setFirstName(e.target.value)
  };

  const handleLastNameChange=(e)=>{
    setLastName(e.target.value)
  };

  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  };

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  };

  const handlePasswordChange2=(e)=>{
    setPassword2(e.target.value)
  };

  //create an account and login automatically
  const register = async () => {
    try{
      //authenticate login credentials
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      const id = auth.currentUser.uid;
      //save other info to database
      set(ref(db, `/users/"${id}`),{
        first_name: firstName,
        last_name: lastName,
      })
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPassword2("");
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      console.log(error.message);
    }
  };

  //const [submit, setHeadingText] = useState("Submit");
  // function handleClick(){
  //   setHeadingText("Submitted");
  //   //add functionality to take client to a new page after submitting their info
  // }

  function handleMouseOver(){
    setMouseOver(true);
  };

  function handleMouseOut(){
    setMouseOver(false);
  };

  return (
    <div className="registrationMiddle">
      <img src={backPick} alt="background_Picture" />

      <div className="registration">
        <div className="regTopText">
          <img src={Logo} alt="site icon"></img>
          <p>Get together online as a family!</p>
        </div>
        <h1>Create an Account </h1>
        <input class="registrationInput" type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
        <input class="registrationInput" type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
        <input class="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input class="registrationInput" type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <input class="registrationInput" type="text" placeholder="Re-Type Password" value={password} onChange={handlePasswordChange} />
        <button className="registrationButton" style={{backgroundColor: isMouseOver ? "black": "#369dfc" }} 
                onClick={register}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
        >{submit}</button>
        <p>
          Not sure? Check out our&nbsp;
          <a href="./">demo account.</a>
        </p>
      </div>
    </div>
  );
}

export default Registration;