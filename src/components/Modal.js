import { useGlobalContext } from '../context';
import React from 'react';

export default function Modal() {
  const { closeModal, selectedMeal} = useGlobalContext();


  return (
    <div className='modal-overlay'>
        <div className='modal-container'>
          <img src={selectedMeal.strMealThumb}></img>
          <div className='modal-info'>
            <h4>{selectedMeal.strMeal}</h4>
            <p>{selectedMeal.strArea}</p>
            <p>Instructions:</p>
            <p>{selectedMeal.strInstructions}</p>
            {selectedMeal.strYoutube && <a href={selectedMeal.strYoutube} target='_blank'>YouTube</a>}
            <button className='btnclose' onClick={closeModal}>Close</button>
          </div>
        </div>
    </div>
  )
}
