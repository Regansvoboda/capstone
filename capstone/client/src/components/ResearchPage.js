import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReCard from './ReCard';



import './styles/Animal.css'

function ResearchPage() {
    const [animalData, setAnimalData] = useState({
        name: '',
        species: '',
        date_tag: '',
        start_loc: '',
        last_ping: '',
        size: '',
        type: '',
        image: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAnimalData({ ...animalData, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://127.0.0.1:5555/animals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(animalData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response or perform any necessary actions after submitting the form
            console.log('Animal created:', data);
            // Reset the form fields
            setAnimalData({
              name: '',
              species: '',
              date_tag: '',
              start_loc: '',
              last_ping: '',
              size: '',
              type: '',
              image: '',
            });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };       


   const [data, setData] = useState([{}])
   const handleSignOut = () => {
       clearCookies();
       window.location.href = '/';
     };
  
     const clearCookies = () => {
       document.cookie.split(";").forEach((cookie) => {
         const cookieName = cookie.trim().split("=")[0];
         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
       });
     };


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
       return <ReCard key={ anObj.name } animal={ anObj } />
   } )
  
   return (
       <div className="ui grid container">
        <button onClick={handleSubmit}>Add New Animal</button>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={animalData.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="species"
                placeholder="Species"
                value={animalData.species}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="date_tag"
                placeholder="Date Tagged"
                value={animalData.date_tag}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="start_loc"
                placeholder="Starting Location"
                value={animalData.start_loc}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="last_ping"
                placeholder="Last Ping"
                value={animalData.last_ping}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="size"
                placeholder="Size"
                value={animalData.size}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="type"
                placeholder="Type"
                value={animalData.type}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="image"
                placeholder="Image Link"
                value={animalData.image}
                onChange={handleInputChange}
            />

            <button type="submit">Submit</button>
        </form>
           <button onClick={handleSignOut}>Sign Out</button>
           <h1> Current Tagged Animals:</h1>
           { animalComponents }
       </div>
   )
}


export default ResearchPage;