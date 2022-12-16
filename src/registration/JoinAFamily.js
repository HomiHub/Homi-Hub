import React, {useState} from "react";
import {db} from "../components/firebase";
import { set, ref, child, update, remove, push, get } from "firebase/database";
import "./registration.css"
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth"
import { Spinner } from "react-bootstrap";


function JoinAFamily() {

  let navigate = useNavigate();

  const[familyName, setFamilyName] = useState("");

  const submit = useState("Create Family");
  const [isMouseOver, setMouseOver] = useState(false);

  const handleFamilyNameChange=(e)=>{
    setFamilyName(e.target.value)
  };

  const [families, setFamilies]= useState();
  const[familiesKeyMap, setFamiliesKeyMap] = useState();
  const [loading, setLoading] = useState(true);
  let famArr = new Set();
  const familyNametoKeyMap = new Map();
  const familiesRef = ref(db, 'families');
  if(loading){
    get(familiesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for(const [key, value] of Object.entries(data)){
          let value1 = value.familyName;
          famArr.add(value1);
          familyNametoKeyMap.set(value1, key);
        }
        setFamilies(famArr);
        setFamiliesKeyMap(familyNametoKeyMap);
        setLoading(false);
      }
      else {
        console.log("no data available");
      }
    } ).catch((error) => {
      console.error(error);
    } );
  }



  //we get the user from the auth component, it's different from
  //firebase auth
  const auth = useAuth();
  //create a family group and set the user as admin
  const createFamily = async () => {
    try{
      //grab the id of the logged in user
      const id = auth.user.uid;
      let familyKey = "";
      console.log("current user id:  ", id );
      //if family exists add user to the family
      if(!families.has(familyName)){
        console.log("creating a new family");
        //create a unique family id, add all family database categories to the database and their family name
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
          wishList: "",
          locations: ""
      })
       familyKey = familyRef.key;
      //update the family to add the user who created it as an admin
      update(ref(db, `families/${familyKey}/admins`),{
        [id]: ""
      });
      } else {
        console.log("family key is being set to ", familiesKeyMap.get(familyName));
        familyKey = familiesKeyMap.get(familyName);
      }

      console.log(familyKey);
      console.log(id);

      //update the family to add the user who created it as a member
      update(ref(db, `families/${familyKey}/members`),{
        [id]: ""
      });

      //update the user account to add the unique family id they just created to their list of families
      update(ref(db, `users/${id}/families`),{
        [familyKey]: familyName
      });

      //navigate the user to the family home page after successfully creating a family
      navigate('/family-homepage');
      
    }
    //catch any errors such as an invalid family name
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

  if(loading) return (
    <div id="spinner-div">
        <Spinner className="spinner-style" animation="border" role="status"></Spinner>
    </div>
    );
  else return ( 
    <div className="registrationMiddle">
      <div className="registration">
        <h1 className="joinAFamilyh1">Create a New Family</h1>
        <input className="registrationInput" type="text" placeholder="Family Name" value={familyName} onChange={handleFamilyNameChange} />
        <p>Existing families: {Array.from(families).map((name) => (name + ', '))}</p>
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