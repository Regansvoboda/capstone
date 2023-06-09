import { useState } from 'react'

import "./styles/AnimalCard.css"
// import { ResponsiveGeoMap } from '@nivo/geo'

// export function AnimalCard({name, species, date_tag, size, type, image}) {
const Front = ({ name, image, species, date_tag, size, type }) => {
    return (
        <div className='front'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0VdeyLpQWlTTikqdsJYwPD1LIrWLaSLj5w&usqp=CAU' alt='animal'/>
            <h1>{ name }</h1>
            <h3>Species: { species }</h3>
            <h3>Date Tagged: { date_tag }</h3>
            <h3>{ size }</h3>
            <h3>Animal: { type }</h3>
            <button className='button'>Stop Tracking!</button>
        </div>
    )
}

const Back = ({ animal }) => {
    
    return (
        <div className='back'>
            <h1>{ animal.name }</h1>
            <h3>{ animal.start_loc }</h3>
            <h2>{ animal.last_ping }</h2>
            <img src='https://worldmapblank.com/wp-content/uploads/2022/09/Blank-World-Map-with-Countries-02-EN-1.webp' alt='map'/>
        </div>
    )
}




const ProfileCard = ({ animal }) => {

    const [ showFront, setShowFront ] = useState( true )
    const toggleFront = () => setShowFront( showFront => !showFront )

    return (
        <div onClick={ toggleFront } 
            className="ui three wide column image animalTile">
            { showFront ? 
                <Front name={ animal.name } image={ animal.image } species={ animal.species } date_tag={ animal.date_tag } size={ animal.size } type={ animal.type } /> : 
                <Back animal={ animal } /> 
            }
        </div>
    )
}


export default ProfileCard;