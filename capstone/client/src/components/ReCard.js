import React, { useState } from 'react';
import "./styles/AnimalCard.css";

const ReCard = ({ animal }) => {

    const [animals, setAnimals] = useState([]);
    
    const deleteAnimal = (id) => {
        fetch(`http://127.0.0.1:5555/animals/${id}`, {
          method: 'DELETE',
        }).then(() => {
          setAnimals(animals.filter((animal) => animal.id !== id));
        });
    };
    
    return (
        <div className='card'>
            <img src={animal.image} alt='animal' />
            <h1>{animal.name}</h1>
            <h3>Species: {animal.species}</h3>
            <h3>Date Tagged: {animal.date_tag}</h3>
            <h3>{animal.size}</h3>
            <h3>Animal: {animal.type}</h3>
            <button onClick={() => deleteAnimal(animal.id)}>Delete Animal</button>
        </div>
    );
};

export default ReCard;