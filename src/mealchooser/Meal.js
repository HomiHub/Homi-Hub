import React from 'react';



const Meal = ({ meal }) => {
    if(!meal) return null;

    const{
        strMeal,
        strMealThumb,
        strInstructions,
        strArea,
        strCategory
    } = meal;

    return (
    
    <div className="meal"> 
        <div className="meal-img">
            <img src={strMealThumb} alt={strMeal}/>
        </div>

        <div className="meal-details">
            <h2 className="meal-title">{strMeal}</h2>
            <p className="meal-instruction">
                {strInstructions && strInstructions.substring(0, 200) + "..."}
                </p>

            <ul className="meal-info">
                <li>
                    Category
                    <strong>{strCategory}</strong>
                </li>

                <li>
                    Origin
                    <strong>{strArea}</strong>
                </li>
            </ul>

            <button className="btn">
                View Recipe
            </button>


        </div>
    </div>
)}

export default Meal