import React, { useState, useEffect } from 'react';
import Meal from './Meal';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';



const RandomMeal = () => {
    const [meal, setMeal] = useState(undefined);

    useEffect(() => {

        async function getMeal() {
            const res = await fetch(API_URL);
            const data = await res.json();

            setMeal(data.meals[0]);
        }

        getMeal();
    }, []);

    if (!meal) return null;

    console.log(meal);

    return (
        <section className ="container">
            <h2>Random Featured Meal</h2>
            <Meal meal = {meal} />
    </section>

    );
};

export default RandomMeal;
