// import React from 'react';

// function IndexComponent() {
//   return (
//     <div>
//       <h1>Welcome to My App!</h1>
//     <body>
//       <div id="root"></div>
//     <style>
//       .mapboxgl-popup {
//       max-width: 400px;
//       font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
//       }
//       </style>
//      <div id='map'></div>
//       <script>
//       mapboxgl.accessToken = 'pk.eyJ1IjoicmVnYW5zdm9ib2RhIiwiYSI6ImNsaWFxcWU2MzA1Y2YzcW5idXYydGs4eDYifQ.Dw0WxiVzFf5VPdKe7qXrdw';
//       const map = new mapboxgl.Map({
//       container: 'map', // container ID
//       style: 'mapbox://styles/regansvoboda/cliaw5e6705qp01p4eohhfyi1', // style URL
//       center: [-74.5, 40], // starting position [lng, lat]
//       zoom: 1.7, // starting zoom
//       });

//       map.on('load', () => {
//       map.addSource('places', {
//       'type': 'geojson',
//       'data': {
//       'type': 'FeatureCollection',
//       'features': [
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Sable</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-90.325, 23.133,]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Blancpain</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [145.969, -12.068]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Caroline</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-117.467, 15.874]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Gale</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-73.380, 36.937]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Lady Kemma</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-108.655, 23.349]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Melanie</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-82.612, 26.998]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Neshi</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       168.623816,
//       -29.428455
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Rose</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-80.848, 24.426]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Tj</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-117.787, 32.153]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Tony</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [-90.499, 12.735]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Vera</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       25.115061,
//       40.749612
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Sable</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -62.696489,
//       44.771392
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Blancpain</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       161.425725,
//       -26.139002
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Caroline</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -89.554834,
//       0.118624
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Gale</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -80.817769,
//       29.582669
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Lady Kemma</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -84.70873,
//       9.003464
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Melanie</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -82.129991,
//       26.359725
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Neshi</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       167.61509,
//       -10.799963
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Rose</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -60.34874,
//       44.895261
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       '<strong>Tj</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -117.450667,
//       32.719717
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Tony</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       -84.819377,
//       9.100502
//     ]
//       }
//       },
//       {
//       'type': 'Feature',
//       'properties': {
//       'description':
//       "<strong>Vera</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//       },
//       'geometry': {
//       'type': 'Point',
//       'coordinates': [
//       23.79523,
//       38.802738
//     ]
//       }
//       }
//       ]
//       }
//       });
//       // Add a layer showing the places.
//       map.addLayer({
//       'id': 'places',
//       'type': 'circle',
//       'source': 'places',
//       'paint': {
//       'circle-color': '#4264fb',
//       'circle-radius': 6,
//       'circle-stroke-width': 2,
//       'circle-stroke-color': '#ffffff'
//       }
//       });
      
//       // Create a popup, but don't add it to the map yet.
//       const popup = new mapboxgl.Popup({
//       closeButton: false,
//       closeOnClick: false
//       });
      
//       map.on('mouseenter', 'places', (e) => {
//       // Change the cursor style as a UI indicator.
//       map.getCanvas().style.cursor = 'pointer';
      
//       // Copy coordinates array.
//       const coordinates = e.features[0].geometry.coordinates.slice();
//       const description = e.features[0].properties.description;
      
//       // Ensure that if the map is zoomed out such that multiple
//       // copies of the feature are visible, the popup appears
//       // over the copy being pointed to.
//       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//       }
      
//       // Populate the popup and set its coordinates
//       // based on the feature found.
//       popup.setLngLat(coordinates).setHTML(description).addTo(map);
//       });
      
//       map.on('mouseleave', 'places', () => {
//       map.getCanvas().style.cursor = '';
//       popup.remove();
//       });
//       });

          
//       </script>

//     </div>
//   );
// }

// export default IndexComponent;
