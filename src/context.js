import React, { useContext, createContext, useEffect, useState } from 'react';
const AppContext = createContext();
const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
function getFromLocalStorage() {
    let favorites;
    if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }else{
        favorites = [];
    }
    return favorites;
} 

function AppProvider({ children }) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFromLocalStorage());



    function selectMeal(idMeal, favoriteMeal) {
        let meal;
        if (favoriteMeal) {
           meal = favorites.find((item) => item.idMeal === idMeal);
        }else{
            meal = meals.find((item) => item.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true);
    }



    async function fetchMeals(url) {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if (data.meals) {
                setMeals(data.meals);
            }else {
                setMeals([]);
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }



    async function fetchRandomMeal() {
        fetchMeals(randomMealUrl);
    }



    useEffect(() => {
        fetchMeals(allMealUrl);
    }, []);


    useEffect(() => {
        if (!searchTerm) {
            return;
        }
        fetchMeals(`${allMealUrl}${searchTerm}`);
    }, [searchTerm]);


    function addToFavorites(idMeal) {
        
        let meal = meals.find((item) => item.idMeal === idMeal);
        let alreadyFavorite = favorites.filter((item) => item.idMeal === meal.idMeal);
        if (alreadyFavorite) {
            return;
            
        }
        let arrayMeal = [...favorites, meal];
        setFavorites(arrayMeal);
        localStorage.setItem('favorites', JSON.stringify(arrayMeal));
    }

    function removeFromFavorites(idMeal) {
        let arrayMeal = favorites.filter((item) => item.idMeal !== idMeal);
        setFavorites(arrayMeal);
        localStorage.setItem('favorites', JSON.stringify(arrayMeal));
    }

    function closeModal() {
        setShowModal(false);
    }

    return <AppContext.Provider value={{ loading, meals,
     setSearchTerm, fetchRandomMeal, showModal,
      selectedMeal, selectMeal, closeModal,
      addToFavorites, removeFromFavorites,
      favorites}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }