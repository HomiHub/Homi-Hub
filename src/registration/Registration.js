import React, { useState } from "react";
import { db } from "../components/firebase";
import { set, ref } from "firebase/database";
import { uploadBytes, ref as sRef } from "firebase/storage";
import { auth } from "../components/firebase";
import { storage } from "../components/firebase";
import "./registration.css"
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../components/auth";

function Registration() {

  let navigate = useNavigate();

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[passwordConfirmation, setPasswordConfirmation] = useState("");
  const[imageUpload, setImageUpload] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

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

  const handlePasswordConfirmationChange=(e)=>{
    setPasswordConfirmation(e.target.value)
  };

  const handleImageChange = (e) => {
    setImageUpload(e.target.files[0]);
  }

  const uploadImage = (id) => {
    const imageRef = sRef(storage, `profilePictures/"${id}`);
    if (imageUpload == null) {
      //UPLOAD A DEFAULT IMAGE (INCOMPLETE)
      // uploadBytes(imageRef, imageUpload).then(() => {
      //   console.log("default image uploaded");
      // }) 
      return;
    }
    else {
      uploadBytes(imageRef, imageUpload).then(() => {
        console.log("image uploaded");
      }) 
    }
  }

  //create an account and login automatically
  const register = async () => {
    if(password !== passwordConfirmation) {
      return setError("Passwords do not match");
    }
    if(imageUpload == null) {
      return setError("Please select an image to upload");
    }
    try{
      setError("");
      setLoading(true)
      //authenticate login credentials
      const user = await signup(email, password);
      console.log(user);
      const id = auth.currentUser.uid;
      //save other info to database

      set(ref(db, `/users/${id}`),{
        first_name: firstName,
        last_name: lastName,
      })
      uploadImage(id);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setImageUpload(null);
      
      navigate('/joinafamily');
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
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
        {error && <Alert variant="danger">{error}</Alert>}
        <input className="registrationInput" type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
        <input className="registrationInput" type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
        <input className="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input className="registrationInput" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <input className="registrationInput" type="password" placeholder="Re-Type Password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
        <input className="registrationInput" type="file" onChange={handleImageChange} accept="image/*"/>
        <button disabled={loading} className="registrationButton" style={{backgroundColor: isMouseOver ? "black": "#369dfc" }} 
                onClick={register}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
        >{submit}</button>
        <p>
          Already Have an Account?&nbsp;
          <a href="./">Log In</a>
        </p>
        <p>
          Not sure? Check out our&nbsp;
          <a href="./">demo account.</a>
        </p>
      </div>
    </div>
  );
}

export default Registration;