import React, { useState, useEffect } from 'react';
import Meal from './Meal';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';



const RandomMeal = () => {
    const [meal, setMeal] = useState(undefined);

    useEffect(() => {
        // fetch(API_URL)
        // .then((res) => res.json())
        // .then((res) => { 
        //     setMeal(res.meals[0]);
        // });

        async function getMeal() {
            const res = await fetch(API_URL);
            const meal = await res.json().meals[0];

            setMeal(data.meals[0]);
        }

        getMeal();
    }, []);

    if(!meal) return null;

    // const{
    //     strMeal,
    //     strMealThumb,
    //     strInstructions,
    //     strArea,
    //     strCategory
    // } = meal;


    return (
        <section className ="container">
            <h2>Random Featured Meal</h2>
            <Meal meal = {meal} />
    </section>

    );
};

export default RandomMeal;