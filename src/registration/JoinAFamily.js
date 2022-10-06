import React, {useState} from "react";
import {db} from "../components/firebase";
import { set, ref, child, update, remove, push } from "firebase/database";
import { auth } from "../components/firebase";
import "./registration.css"
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"
import { useNavigate } from "react-router-dom";

function JoinAFamily() {

  let navigate = useNavigate();

  const[familyName, setFamilyName] = useState("");

  const submit = useState("Create Family");
  const [isMouseOver, setMouseOver] = useState(false);

  const handleFamilyNameChange=(e)=>{
    setFamilyName(e.target.value)
  };


  //create a family group and set the user as admin
  const createFamily = async () => {
    try{
        const id = auth.currentUser.uid;

        const familyRef = push(ref(db, 'families'),{
          calendar: "",
          chat: "",
          choreTracker: "",
          consequences: "",
          emergencyContacts: "",
          errandTracker: "",
          familyName: familyName,
          gallery: "",
          groceryList: "",
          mealChooser: "",
          members: "",
          rewards: "",
          wishList: ""
      })
      const familyKey = familyRef.key;
      console.log(familyKey);
      console.log(id);

      update(ref(db, `families/${familyKey}/admins`),{
        [id]: ""
      });

      update(ref(db, `families/${familyKey}/members`),{
        [id]: ""
      });

      update(ref(db, `users/${id}/families`),{
        [familyKey]: familyName
      });
      navigate('/familyHomePage');
      
    }
    //catch any errors such as an invalid email when creating an account
    catch (error) {
      console.log(error.message);
    }
  };

  function handleMouseOver(){
    setMouseOver(true);
  };

  function handleMouseOut(){
    setMouseOver(false);
  };

  return (
    <div className="registrationMiddle">
      <div className="registration">
        <h1 className="joinAFamilyh1">Create a New Family</h1>
        <input class="registrationInput" type="text" placeholder="Family Name" value={familyName} onChange={handleFamilyNameChange} />
        <button className="joinafamilyButton" style={{backgroundColor: isMouseOver ? "blue": "#369dfc" }} 
                onClick={createFamily}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
        >{submit}</button>
      </div>
    </div>
  );
}

export default JoinAFamily;