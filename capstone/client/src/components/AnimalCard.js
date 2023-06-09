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
            <button className='button'>Start Tracking!</button>
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

// const MyResponsiveGeoMap = () => (
//     <ResponsiveGeoMap
//         features="/* please have a look at the description for usage */"
//         margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
//         projectionTranslation={[ 0.5, 0.5 ]}
//         projectionRotation={[ 0, 0, 0 ]}
//         fillColor="#eeeeee"
//         borderWidth={0.5}
//         borderColor="#333333"
//         enableGraticule={true}
//         graticuleLineColor="#666666"
//     />
// )



const AnimalCard = ({ animal }) => {

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

export default AnimalCard;


