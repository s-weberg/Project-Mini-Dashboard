import { useState, useEffect } from 'react';
import JoggingImage from './assets/jogging.jpg';
import GymImage from './assets/gym.jpg';
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

function App() {
  const [isRaining, setIsRaining] = useState(false);
  const [advice, setAdvice] = useState<string>('Loading advice...');
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Helsingborg');
  const cities = ['Helsingborg', 'Stockholm', 'Gothenburg', 'Malmo'];

  useEffect(() => {
    let completedRequests = 0;

    if (!navigator.onLine) {
      setAdvice('No internet connection.');
      setIsRaining(false);
      setLoading(false);
      return;
    }

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
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      }
    };

    fetch('https://api.adviceslip.com/advice')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<AdviceSlip>;
      })
      .then((data) => {
        setAdvice(data && data.slip && data.slip.advice ? data.slip.advice : 'Failed to load advice.');
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching advice:', error);
        setAdvice('Failed to fetch advice.');
        completedRequests += 1;
        if (completedRequests === 2) {
          setLoading(false);
        }
      });

    fetchWeather();
  }, [selectedCity]);

  const imageSrc = isRaining ? GymImage : JoggingImage;

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Advice</h2>
        <blockquote className="mb-6 p-4 bg-gray-50 border-l-4 border-blue-200 text-center">
          <p className="text-lg text-gray-700">{advice}</p>
          <footer className="text-sm text-gray-500 mt-2">Advice Slip</footer>
        </blockquote>
        <img
          src={imageSrc}
          alt={isRaining ? 'Gym workout' : 'Jogging outside'}
          className="mx-auto mb-6 w-full max-w-[500px] h-auto"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daily Weather in {selectedCity}</h1>
        <div className="mt-4">
          <label htmlFor="citySelect" className="mr-2 text-gray-600">Choose a city:</label>
          <select
            id="citySelect"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border rounded bg-white text-gray-700"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="text-gray-800">
                {city}
              </option>
            ))}
          </select>
        </div>
        <h3 className="text-lg text-gray-600 mt-4">Is it raining today?</h3>
        <p className="text-xl font-semibold mt-1 text-gray-800">{isRaining ? 'Yes' : 'No'}</p>
        <p className="text-md text-gray-600 mt-2">
          {isRaining ? 'It is raining today, so hit the gym!' : 'Nice weather today - go for a jog!'}
        </p>
      </div>
    </div>
  );
}

export default App;