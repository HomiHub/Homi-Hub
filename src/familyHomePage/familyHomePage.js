import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { ref, onValue } from "firebase/database";

function FamilyHomePage() {

  let navigate = useNavigate();
  //const id = auth.currentUser.uid;
  const [fbVals, setFBVals] = useState([]);

  const [keys, setKeys] = useState("");
  const [familyIDs, setFamilyIDs] = useState([]);

  //database query, work in progress
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setFBVals([]);
      const data = snapshot.val();
      setFamilyIDs(data);
      console.log(familyIDs);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  //render an h1 element with data from a variable
  function printH1(){
    document.getElementById("theh1").innerHTML = familyIDs;
  };

//this is a bad implementation, the page crashes when reloading
//onLoad={printH1()}
  return (
    <div>
        <h1>Welcome to your family page</h1>
        <div >
          <h1 id="theh1"></h1>
        </div>
        {fbVals.map((query) => (
          <>
            <p>{query.key}</p>
            <button>Testing</button>
          </>
        ))}
    </div>
  );
}

export default FamilyHomePage;