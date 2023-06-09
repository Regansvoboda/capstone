// import './styles/Animal.css'
// import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import AnimalCard from './AnimalCard';
import './styles/Animal.css'


function Animal() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch('/animals').then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    const animalComponents = data.map( anObj => {
        return <AnimalCard key={ anObj.name } animal={ anObj } />
    } )


    // const post_array = posts.map((post) => (
    //     <div className="post-container" key={post.id}>
    //         <ForYouCard {...post} />
    //     </div>
    // ));
    return (
        <div className="ui grid container">
            <h1> Browse our tagged animals</h1>
            { animalComponents }
        </div>
    )
}

export default Animal;