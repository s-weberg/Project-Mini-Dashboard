import { useState, useEffect } from 'react';
import JoggingImage from './Assets/jogging.jpg';
import GymImage from './Assets/gym.jpg';
import './App.css';

interface WeatherData {
  weather: Array<{
    main: string;
  }>;
  name: string;
}

interface AdviceSlip {
  slip: {
    id: number;
    advice: string;
  };
}

function Weather() {
  const [isRaining, setIsRaining] = useState(false);
  const [advice, setAdvice] = useState<string>('Loading advice...');
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Helsingborg');
  const cities = ['Helsingborg', 'Stockholm', 'Gothenburg', 'Malmo'];

  useEffect(() => {
    let completedRequests = 0;

    const fetchWeather = async () => {
      try {
        const apiKey = '350817c71258db050226dd69255c5ee7';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=en`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: WeatherData = await response.json();
        const raining = data.weather[0].main === 'Rain';
        setIsRaining(raining);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setIsRaining(false); // Fallback for offline or failed requests
      } finally {
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      }
    };

    const fetchAdvice = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: AdviceSlip = await response.json();
        setAdvice(data.slip.advice ?? 'Failed to load advice.');
      } catch (error) {
        console.error('Error fetching advice:', error);
        setAdvice('No internet connection or failed to fetch advice.');
      } finally {
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      }
    };

    fetchWeather();
    fetchAdvice();
  }, [selectedCity]);

  const imageSrc = isRaining ? GymImage : JoggingImage;

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-150">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Advice</h2>
        <blockquote className="mb-6 p-4 bg-white text-center">
          <p className="text-lg text-gray-700">{advice}</p>
        </blockquote>
        <img
          src={imageSrc}
          alt={isRaining ? 'Gym workout' : 'Jogging outside'}
          className="mx-auto mb-6 w-full max-w-[500px] h-auto"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daily Weather in {selectedCity}</h1>
<div className="mt-4 flex flex-col items-center">
  <div className="flex flex-col items-center mb-4">
    <label htmlFor="citySelect" className="mb-2 text-gray-600">Choose a city:</label>
    <select
      id="citySelect"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className="p-2 border rounded bg-white text-gray-700 w-full max-w-xs"
    >
      {cities.map((city) => (
        <option key={city} value={city} className="text-gray-800">
          {city}
        </option>
      ))}
    </select>
  </div>
  <h3 className="text-lg text-gray-600 mt-4 text-center">Is it raining today?</h3>
  <p className="text-xl font-semibold mt-1 text-gray-800 text-center">{isRaining ? 'Yes' : 'No'}</p>
  <p className="text-md text-gray-600 mt-2 text-center">
    {isRaining ? 'It is raining today, so hit the gym!' : 'Nice weather today - go for a jog!'}
  </p>
</div>
</div>
    </div>
  );
}

export default Weather;