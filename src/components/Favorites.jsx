import React from "react";
import { useGlobalContext } from "../context";

function Favorites() {
  const { favorites, removeFromFavorites, selectMeal } = useGlobalContext();

  return (
    <>
      <div className="favorites-header">
        <h2>My Favorite Meals</h2>
      </div>

      {favorites.length < 1 ? (
        <div className="nothing-in-favorite">
          <h3>You have nothing in your favorite list.</h3>
        </div>
      ) : (
        <div className="favorites">
          {favorites.map((favorite) => {
            const { idMeal, strMealThumb: img, strMeal: title } = favorite;
            return (
              <div key={idMeal} className="favorite-meal">
                <img
                  src={img}
                  alt={title}
                  onClick={() => selectMeal(idMeal, true)}
                />
                <div className="favorite-text">
                  <h3>{title}</h3>
                  <button onClick={() => removeFromFavorites(idMeal)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Favorites;
