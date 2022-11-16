import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../components/firebase";
import useUploadLocation from "../gpsTracker/uploadLocation";
import GroceryList from "../groceryList/GroceryList";
import { Button } from "react-bootstrap";
import "./familyHomePage.css"
import GPSTracker from "../gpsTracker/Tracker";
import ChatRoom from '../chatRoom/ChatRoom';
import ChoreTracker from '../choretracker/TodoList';
import ErrandTracker from '../errandTracker/ErrandTracker';
import MealChooser from '../MealChooser/Mealchosser';
import { set, ref, child, update, remove, push, get, onValue } from "firebase/database";
//import SyncedGallery from '../syncedGallery/SyncedGallery'

function FamilyHomePage() {

  console.log("Starting over");
  // TODO: run the hook every 10 minutes
    //currently we only upload user location when they join a family or log in 
  // useEffect(() => {
  //   const interval = setInterval(useUploadLocation, 1000);
  //   return () => clearInterval(interval)
  // });

  //this causes issues when rendering a new component
  //const currlocation = useUploadLocation();

  let navigate = useNavigate();
  //const id = auth.currentUser.uid;
  const [fbVals, setFBVals] = useState([]);
  const [keys, setKeys] = useState("");
  const [familyIDs, setFamilyIDs] = useState("default");
  const [pageNum, setPageNum] = useState(0);
  //const [familyName, setFamilyName] = useState("Default");

  //database query, work in progress
  let famArr = new Set();
  let family = "default";
  const familiesRef = ref(db, 'families');
  console.log("before get");
  get(familiesRef).then((snapshot) => {
    console.log("In get");
    if (snapshot.exists()) {
      const data = snapshot.val();
    
      for(const [key, value] of Object.entries(data)){
        let value1 = value.familyName;
        famArr.add(value1);
      }
      
      const myIterator = famArr.entries();
      for (const entry of myIterator) {
        //console.log(entry[0]);
        family = entry[0];
        console.log("ran 1");
        console.log(family);
      }
      //setFamilyIDs(famArr)
      console.log(famArr);
    }}
  );

  const logout = async () => {
    await signOut(auth);
  };

  const ChatClick = async () => {
      setPageNum(0);
  }

  const GroceryClick = async () => {
    setPageNum(1);
  }

  const ChoreClick = async () => {
    setPageNum(2);
  }

  const ErrandClick = async () => {
    setPageNum(3);
  }

  const MealClick = async () => {
    setPageNum(4);
  }

  const GPSClick = async () => {
    setPageNum(5);
  }

  const CalendarClick = async () => {
    setPageNum(6);
  }

  const GalleryClick = async () => {
    setPageNum(7);
  }

  const ContactsClick = async () => {
    setPageNum(8);
  }

  function ComponentRender(){
    if(pageNum === 0){
      return <ChatRoom></ChatRoom>;
    }
    else if(pageNum === 1){
      return <GroceryList></GroceryList>; 
    }
    else if(pageNum === 2){
      return <ChoreTracker></ChoreTracker>; 
    }
    else if(pageNum === 3){
      return <ErrandTracker></ErrandTracker>;
    }
    else if(pageNum === 4){
      return <MealChooser></MealChooser>;
    }
    else if(pageNum === 5){
      return <GPSTracker></GPSTracker>;
    }
    else if(pageNum === 6){
      return; //<SyncedCalendar></SyncedCalendar>; 
    }
    else if(pageNum === 7){
      return; //<SyncedGallery></SyncedGallery>; 
    }
    else if(pageNum === 8){
      return; //<EmergencyContacts></EmergencyContacts>; 
    }
    else{
      return <h1>Error loading your page</h1>;
    }
  };

  console.log("ran 2");

  return (
    <div className="familyPage">
        <h1>Welcome to your family page</h1>
        <Button type="button" className="familyPageButton" onClick={ChatClick}>Chat</Button>
        <Button type="button" className="familyPageButton" onClick={ChoreClick}>Chore Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={ErrandClick}>Errand Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={GroceryClick}>Grocery List</Button>
        <Button type="button" className="familyPageButton" onClick={MealClick}>Meal Chooser</Button>
        <Button type="button" className="familyPageButton" onClick={GPSClick}>GPS Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={CalendarClick}>Calendar</Button>
        <Button type="button" className="familyPageButton" onClick={GalleryClick}>Gallery</Button>
        <Button type="button" className="familyPageButton" onClick={ContactsClick}>Emergency Contacts</Button>
        <ComponentRender></ComponentRender>
        
    </div>
  );
}

export default FamilyHomePage;