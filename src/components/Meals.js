import { useGlobalContext } from "../context";
import { AiOutlineLike } from "react-icons/ai";
import React from 'react'

export default function Meals() {
    const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

    if (loading) {
        return (
            <div className="main">
                <h4>Loading...</h4>
            </div>
        )
    }

    if (meals.length < 1) {
        return (
            <div className="main">
                <h4>No meals matched your search term. Try again</h4>
            </div>

        )
    }

    return (
        <div className="main">
            {meals.map((item) => {
                return (
                    <div key={item.idMeal} className="mealcard">
                        <img onClick={() => selectMeal(item.idMeal)} src={item.strMealThumb} alt={item.strMeal}></img>
                        <div className="infocard">
                            <h5 className="titlecard">{item.strMeal}</h5>
                            <button className="likebtn" onClick={() => addToFavorites(item.idMeal)}><AiOutlineLike /></button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
