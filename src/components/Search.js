import { useGlobalContext } from '../context';
import React, { useState } from 'react';

export default function Search() {
    const [text, setText] = useState("");
    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(text){
            setSearchTerm(text);
        }
    }

    function handleRandomMeal() {
        setSearchTerm("");
        setText("");
        fetchRandomMeal();

    }
    return (
        <div className='header-search-container'>
            <form className='form' onSubmit={handleSubmit}>
                <input type='text'
                 name="title" 
                 id='title'
                 placeholder='type meal'
                 value={text}
                 onChange={handleChange}
                 ></input>
                 <button className="btnsearch" type='submit'>Submit</button>
                 <button onClick={handleRandomMeal} className='btnrandom' type='button'>Ramdon Meal</button>
            </form>
        </div>
    )
}
