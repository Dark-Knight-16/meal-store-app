import React from "react";
import { useGlobalContext } from "../context";

function Meals() {
  const { loading, meals, addToFavorites, selectMeal } = useGlobalContext();

  if (loading) {
    return (
      <>
        <div className="loading-no-match">
          <h4>Loading......</h4>
        </div>
      </>
    );
  }

  if (meals.length < 1) {
    return (
      <div className="loading-no-match">
        <h4>No match found, please try again.</h4>
      </div>
    );
  }

  return (
    <>
      <div className="meals">
        {meals.map((meal) => {
          const { idMeal, strMeal: title, strMealThumb: img } = meal;
          return (
            <div key={idMeal} className="single-meal">
              <img src={img} alt={title} onClick={() => selectMeal(idMeal)} />
              <div className="meal-text">
                <h3>{title}</h3>
                <button onClick={() => addToFavorites(idMeal)}>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Meals;
