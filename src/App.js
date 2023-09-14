import React, { useState } from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  // const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=205ea54569064a312859cd3f962d45ee`

  // const searchLocation = (event) =>{
  //   if(event.key === 'Enter'){
  //       axios.get(url).then((response) => {
  //       setData(response.data)
  //     })
  //   }
  // }

  const apiKey = "205ea54569064a312859cd3f962d45ee";
  const searchLocation = (event) => {
    if (event.key === "Enter"){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=205ea54569064a312859cd3f962d45ee`;

      fetch(url).then((response) => {
        if(!response.ok){
          throw new Error(`Http error ! Status: ${response.status} `);
        }
        return response.json();
      })
        .then((data) =>{
          setData(data);
        }) 
        .catch((error) => {
          console.error("Fetch Error: ", error);
        })
 }
  }

  return (
    <div className="app">
      <div className="search">
        <input type="text" value={location} 
        onKeyDown ={searchLocation}
        onChange={event => setLocation(event.target.value)}
        placeholder = "Enter A Location"/>
      </div>
      {data.name != undefined &&
    <div className="container">

      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          <h1>{`${Math.round(data.main?.temp - 273.15)}° C`}</h1>
        </div>
        <div className="description">
          <p>{data.weather?.[0]?.description}</p>
        </div>
      </div>

      <div className="bottom">
        <div className="feels">
        <p className="bold">{`${Math.round(data.main?.feels_like - 273.15)}° C`}</p>
        <p>Feels Like</p>
        </div>
        <div className="humidity">
          <p className="bold">{`${data.main?.humidity}%`}</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <p className="bold">{`${data.wind?.speed} m/s`}</p>
          <p>Wind Speed</p>
        </div>
      </div>

    </div>
}
    </div>
  );
}

export default App;
