import React from 'react';
import "./styles/AnimalCard.css";

const Front = ({ name, image, species, date_tag, size, type }) => {
    return (
        <div className='front'>
            <img src={image} alt='animal' />
            <h1>{name}</h1>
            <h3>Species: {species}</h3>
            <h3>Date Tagged: {date_tag}</h3>
            <h3>{size}</h3>
            <h3>Animal: {type}</h3>
        </div>
    );
};

const Back = ({ animal }) => {
    return (
        <div className='back'>
            <h1>{animal.name}</h1>
            <h3>{animal.start_loc}</h3>
            <h2>{animal.last_ping}</h2>
            <img src={animal.image} alt='map' />
        </div>
    );
};

const AnimalCard = ({ animal }) => {
    const [showFront, setShowFront] = React.useState(true);
    const toggleFront = () => setShowFront((showFront) => !showFront);

    return (
        <div
            onClick={toggleFront}
            className="ui three wide column image animalTile"
        >
            {showFront ? (
                <Front
                    name={animal.name}
                    image={animal.image}
                    species={animal.species}
                    date_tag={animal.date_tag}
                    size={animal.size}
                    type={animal.type}
                />
            ) : (
                <Back animal={animal} />
            )}
        </div>
    );
};

export default AnimalCard;




