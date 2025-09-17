
import { useState, useEffect } from 'react';
import Quotes from './quote';
import './App.css'; 

interface WeatherData {
  weather: Array<{
    main: string;
  }>;
}

function App() {
  const [isRaining, setIsRaining] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '350817c71258db050226dd69255c5ee7';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Helsingborg&appid=${apiKey}&units=metric&lang=en`;
        
        const response = await fetch(url);
        const data: WeatherData = await response.json();
        
        const raining = data.weather[0].main === 'Rain';
        setIsRaining(raining);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading weather...</div>;
  }

  return (
    <div className="App">
      <h1>Daily weather in Helsingborg</h1>
      <h3>Is it raining today? </h3>
      <p>{isRaining ? 'Yes' : 'No'}</p>
      <Quotes isRaining={isRaining} />
    </div>
  );
}

export default App;