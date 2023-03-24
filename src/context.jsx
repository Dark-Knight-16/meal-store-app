import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getFavoritesFromLocal = () => {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const filterMealsUrl = "www.themealdb.com/api/json/v1/1/filter.php?";

  const [loading, setLoading] = useState(false);

  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(getFavoritesFromLocal());

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  //Fetch meals function
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // on mount
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  // on search
  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  //  filter by category
  useEffect(() => {
    fetchMeals(`${filterMealsUrl}c=${searchTerm}`);
  }, [searchTerm]);

  // filter by country
  useEffect(() => {
    fetchMeals(`${filterMealsUrl}a=${searchTerm}`);
  }, [searchTerm]);

  // Go back to home page
  const goHome = () => {
    fetchMeals(allMealsUrl);
    setSearchTerm("");
  };

  //  Add to favorites
  const addToFavorites = (idMeal) => {
    let meal = meals.find((meal) => meal.idMeal === idMeal);
    let alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    setFavorites([...favorites, meal]);
    localStorage.setItem("favorites", JSON.stringify([...favorites, meal]));
  };

  //  Remove from favorites
  const removeFromFavorites = (idMeal) => {
    let updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  // close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        goHome,
        loading,
        meals,
        setSearchTerm,
        favorites,
        addToFavorites,
        removeFromFavorites,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
