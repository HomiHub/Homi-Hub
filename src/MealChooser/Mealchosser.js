import React, {useState} from "react";
import {RandomMeal, Meal, SearchBar} from "./components";
import { useNavigate } from "react-router-dom";
import "./mealchooser.css"
import {db} from "../components/firebase";
import { set, ref } from "firebase/database";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"




function Mealchooser(){
    return(
        <div className = "Mealchooser">
         {/* <SearchBar /> */}
         <RandomMeal />
        </div>
    );
}

export default Mealchooser;