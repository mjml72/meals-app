import { useGlobalContext } from '../context';
import React from 'react';

export default function Favorites() {
    const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();


    return (
        <div className='favorites'>
            <div className='favorites-container'>
                <h5>Favorites</h5>
                <div className='favorite-image'>
                    {favorites.length > 0 && favorites.map((item) => {
                        return (
                            <div key={item.idMeal} className='imagefav'>
                                <img src={item.strMealThumb} alt={item.strMeal}
                                onClick={()=> selectMeal(item.idMeal, true)}
                                ></img>
                                <button className='remove' onClick={() => removeFromFavorites(item.idMeal)}>remove</button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
