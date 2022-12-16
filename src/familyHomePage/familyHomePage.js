import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, User } from "firebase/auth";
import { auth, db } from "../components/firebase";
import useUploadLocation from "../gpsTracker/uploadLocation";
import GroceryList from "../groceryList/GroceryList";
import { Button } from "react-bootstrap";
import "./familyHomePage.css"
import GPSTracker from "../gpsTracker/Tracker";
import ChatRoom from '../chatRoom/ChatRoom';
import ChoreTracker from '../choretracker/TodoList';
import ErrandTracker from '../errandTracker/ErrandTracker';
import EmergencyContacts from "../emergencyContact/EmergencyContacts";
import MealChooser from '../MealChooser/Mealchooser';
import { set, ref, child, update, remove, push, get, onValue } from "firebase/database";
import SyncedGallery from '../syncedGallery/SyncedGallery'
import {default as SyncedCalendar} from '../cal/Cal'
import {default as WishList} from '../wishList/WishList'


function FamilyHomePage() {

  // TODO: run the hook every 10 minutes
    //currently we only upload user location when they join a family or log in 
  // useEffect(() => {
  //   const interval = setInterval(useUploadLocation, 1000);
  //   return () => clearInterval(interval)
  // });

  //this causes issues when rendering a new component
  //const currlocation = useUploadLocation();

  let navigate = useNavigate();
  const [fbVals, setFBVals] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const id = auth.currentUser.uid;
  console.log("the user id");
  console.log(id);
  const [familyName, setFamilyName] = useState("Default");
  const [familyID, setFamilyID] = useState("Default");

  //get the familyID of the logged in user
  //query location
  const userFamilyRef = ref(db, `/users/${id}/families`);
  get(userFamilyRef).then((snapshot) => {
    if (snapshot.exists()) {
      //all the data from the query
      const data = snapshot.val();
      console.log(data);
      //currently assuming the user belongs to one family and we grab the single value here
      for(const [key, value] of Object.entries(data)){
        let value1 = key;
        setFamilyID(value1);
      }
      console.log("family ID found");
      console.log(familyID);
    }}
  );

  //get the family name 
  const familyRef = ref(db, `/families/${familyID}`);
  get(familyRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("family name found");
      console.log(snapshot.val().familyName);
      setFamilyName(snapshot.val().familyName);
    }}
  );



  // //get the list of family keys and family names from the database
  // let famArr = new Set();
  // let famKey = new Set();
  // let family = "default";
  // const familiesRef = ref(db, 'families');
  // get(familiesRef).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     const data = snapshot.val();
  //     console.log(data);
  //     for(const [key, value] of Object.entries(data)){
  //       let value1 = key;
  //       console.log("key found");
  //       console.log(value1);
  //       famKey.add(value1);
  //     }
  //     for(const [key, value] of Object.entries(data)){
  //       let value1 = value.familyName;
  //       famArr.add(value1);
  //     }
      
  //     const myIterator = famKey.entries();
  //     let counter = 0;
  //     let index = 0;
  //     for (const entry of myIterator) {
  //       //console.log(entry[0]);
  //       if(entry[0] === familyID){
  //         console.log("found family");
  //         console.log(entry[0]);
  //         index = counter;
  //       }
  //       else{
  //         console.log("family not found");
  //         console.log(entry[0]);
  //       }
  //       counter++;
  //       //setFamilyName(family);  causes continuous reloading
  //     }
  //     //setFamilyIDs(famArr)  causes continuous reloading
  //     counter = 0;
  //     const myIterator2 = famArr.entries();
  //     for (const entry of myIterator2) {
  //       if(counter === index){
  //         console.log("found indexx");
  //         console.log(entry[0]);
  //         setFamilyName(entry[0]);
  //       }
  //       else{
  //         console.log("wrong index");
  //       }
  //       counter++;
  //     }
  //   }}
  // );

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

  const WishListClick = async () => {
    setPageNum(9);
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
      return <SyncedCalendar></SyncedCalendar>; 
    }
    else if(pageNum === 7){
      return <SyncedGallery></SyncedGallery>; 
    }
    else if(pageNum === 8){
      return <EmergencyContacts></EmergencyContacts>; 
    }
    else if(pageNum === 9){
      return<WishList></WishList>; 
    }
    else{
      return <h1>Error loading your page</h1>;
    }
  };

  console.log("ran 2");

  return (
    <div className="familyPage">
        <h1>{familyName} Family</h1>
        <Button type="button" className="familyPageButton" onClick={ChatClick}>Chat</Button>
        <Button type="button" className="familyPageButton" onClick={ChoreClick}>Chore Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={ErrandClick}>Errand Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={GroceryClick}>Grocery List</Button>
        <Button type="button" className="familyPageButton" onClick={MealClick}>Meal Chooser</Button>
        <Button type="button" className="familyPageButton" onClick={GPSClick}>GPS Tracker</Button>
        <Button type="button" className="familyPageButton" onClick={CalendarClick}>Calendar</Button>
        <Button type="button" className="familyPageButton" onClick={GalleryClick}>Gallery</Button>
        <Button type="button" className="familyPageButton" onClick={ContactsClick}>Emergency Contacts</Button>
        <Button type="button" className="familyPageButton" onClick={WishListClick}>Wish List</Button>
        <ComponentRender></ComponentRender>
        
    </div>
  );
}

export default FamilyHomePage;