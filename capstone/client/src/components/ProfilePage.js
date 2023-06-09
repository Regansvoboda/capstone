import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
// import ProfileCard from './ProfileCard';

// import './styles/Animal.css'

function ProfilePage() {
    const [orders, setOrders] = useState([]);
    const location = useLocation();
    const userEmail = location.state?.userEmail;
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
 
  
      fetch('/orders')
      .then(response => response.json())
      .then(data => {
        // Filter the orders to get the animals belonging to the signed-in user
        const userOrders = data.filter(order => order.user_id );
    
        // Get the animal IDs from the user's orders
        const animalIds = userOrders.map(order => order.animal_id);
    
        // Make an API call to fetch the animal details based on the IDs
        fetch('/animals')
          .then(response => response.json())
          .then(animalData => {
            // Filter the animals based on the IDs
            const userAnimals = animalData.filter(animal => animalIds.includes(animal.id));
    
            // Display the animal details on the page
            userAnimals.forEach(animal => {
              // Display the animal name, species, etc. in the desired format
              console.log(`Animal Name: ${animal.name}`);
              console.log(`Species: ${animal.species}`);
              console.log('---');
            });
          })
          .catch(error => {
            console.error('Error fetching animal data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user orders:', error);
      });
  
    const deleteOrder = (id) => {
      fetch(`http://127.0.0.1:5555/orders/${id}`, {
        method: 'DELETE',
      }).then(() => {
        setOrders(orders.filter((order) => order.id !== id));
      });
    };
  
    return (
      <div className="ui grid container">
        <button onClick={handleSignOut}>Sign Out</button>
        {userEmail ? (
          <>
            <h2>Animals {userEmail} is tracking:</h2>
            {orders.map((order) => (
              <div key={order.id}>
                  <p>
                  Animal: {order.animal.name} | 
                  Species: {order.animal.species} |
                  Date Tagged: {order.animal.date_tag}
                  <button onClick={() => deleteOrder(order.id)}>Stop Tracking</button>
                  </p>
              </div>
            ))}
          </>
            ) : (
              <h2>No Animals being tracked</h2>
          )}
        {/* <div className="ui grid container">
              { orderComponents }
        </div> */}
      </div>
    );
  }
export default ProfilePage;
