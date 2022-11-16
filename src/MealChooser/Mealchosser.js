import React from "react";
// import { RandomMeal } from "./Mcomponents";
import RandomMeal from "./RandomMeal";
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