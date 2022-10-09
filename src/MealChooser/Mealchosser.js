import React from "react";
import {RandomMeal} from "./Mcomponents";
// import {RandomMeal} from 'C:\\Users\\ashur\\Documents\\GitHub\\Homi-Hub\\src\\mealchooser\\Mcomponents';

// import RandomMeal from "../Mcomponents/RandomMeal";
import "./mealchooser.css"



function Mealchooser(){
    return(
        <div className = "Mealchooser">
         {/* <SearchBar /> */}
         <RandomMeal />
        </div>
    );
}

export default Mealchooser;