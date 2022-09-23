import React, {useState} from "react";
import {db} from "../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";

function Registration() {

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleFirstNameChange=(e)=>{
    setFirstName(e.target.value)
  }

  const handleLastNameChange=(e)=>{
    setLastName(e.target.value)
  }

  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  }

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }

  //create
  //only use this to create a new db
  const writeToDB = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/users/"${uuid}`),{
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    })
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  //read
  //update
  //delete

  //const [submit, setHeadingText] = useState("Submit");
  const submit = useState("Submit");
  const [isMouseOver, setMouseOver] = useState(false);

  // function handleClick(){
  //   setHeadingText("Submitted");
  //   //add functionality to take client to a new page after submitting their info

  // }

  function handleMouseOver(){
    setMouseOver(true);
  }

  function handleMouseOut(){
    setMouseOver(false);
  }


  return (
    <div className="container">
      <h1>Homi Hub Registration </h1>
      <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
      <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button style={{backgroundColor: isMouseOver ? "black": "white" }} 
              onClick={writeToDB}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
      >{submit}</button>
    </div>
  );
}

export default Registration;