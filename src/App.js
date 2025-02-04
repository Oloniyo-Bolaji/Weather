import React from 'react';
import {WeatherProvider} from './Context'
import './App.css';
import Weather from './Weather'






const App = () => {
  return (
    <WeatherProvider>
      <Weather />
    </WeatherProvider>
  );
}

export default App;
