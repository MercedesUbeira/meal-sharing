import React, { useState, useEffect } from "react";

function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3074/api/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data));
  }, []);

  return (
    <div>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealsList;
