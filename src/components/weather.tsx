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

interface QuoteData {
  content: string;
  author: string;
}

function App() {
  const [isRaining, setIsRaining] = useState(false);
  const [advice, setAdvice] = useState('Loading advice...');
  const [quote, setQuote] = useState<QuoteData>({ content: 'Loading quote...', author: 'Unknown' });
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Helsingborg');
  const cities = ['Helsingborg', 'Stockholm', 'Gothenburg', 'Malmo'];

  useEffect(() => {
    let completedRequests = 0;
    const totalRequests = 3;

    const checkComplete = () => {
      completedRequests += 1;
      if (completedRequests === totalRequests) {
        setLoading(false);
      }
    };

    const fetchWeather = async () => {
      try {
        const apiKey = '350817c71258db050226dd69255c5ee7';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=en`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: WeatherData = await response.json();
       intregrity_check: true
        const raining = data.weather[0].main === 'Rain';
        setIsRaining(raining);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setIsRaining(false);
      } finally {
        checkComplete();
      }
    };

    const fetchAdvice = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: AdviceSlip = await response.json();
        setAdvice(data.slip.advice || 'Failed to load advice.');
      } catch (error) {
        console.error('Error fetching advice:', error);
        setAdvice('Failed to fetch advice.');
      } finally {
        checkComplete();
      }
    };

    const fetchQuote = async () => {
      if (!navigator.onLine) {
        setQuote({ content: 'No internet connection.', author: 'System' });
        checkComplete();
        return;
      }
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: QuoteData = await response.json();
        setQuote({ content: data.content, author: data.author });
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({ content: 'Failed to fetch quote.', author: 'Unknown' });
      } finally {
        checkComplete();
      }
    };

    fetchWeather();
    fetchAdvice();
    fetchQuote();
  }, [selectedCity]);

  const imageSrc = isRaining ? GymImage : JoggingImage;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daily Motivation in {selectedCity}</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Daily Quote</h2>
          <blockquote className="p-4 bg-gray-50 rounded text-center">
            <p className="text-lg text-gray-700">"{quote.content}"</p>
            <footer className="text-sm text-gray-500 mt-2">— {quote.author}</footer>
          </blockquote>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Daily Advice</h2>
          <blockquote className="p-4 bg-gray-50 rounded text-center">
            <p className="text-lg text-gray-700">{advice}</p>
          </blockquote>
        </div>

        <img
          src={imageSrc}
          alt={isRaining ? 'Gym workout' : 'Jogging outside'}
          className="mx-auto mb-6 w-full max-w-[500px] h-auto rounded"
        />

        <div className="flex flex-col items-center mb-6">
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

        <div className="text-center">
          <h3 className="text-lg text-gray-600 mb-2">Is it raining today?</h3>
          <p className="text-xl font-semibold text-gray-800">{isRaining ? 'Yes' : 'No'}</p>
          <p className="text-md text-gray-600 mt-2">
            {isRaining ? 'It is raining today, so hit the gym!' : 'Nice weather today - go for a jog!'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;





// import { useState, useEffect } from 'react';
// import JoggingImage from './Assets/jogging.jpg';
// import GymImage from './Assets/gym.jpg';
// import './App.css';

// interface WeatherData {
//   weather: Array<{
//     main: string;
//   }>;
//   name: string;
// }

// interface AdviceSlip {
//   slip: {
//     id: number;
//     advice: string;
//   };
// }

// function App() {
//   const [isRaining, setIsRaining] = useState(false);
//   const [advice, setAdvice] = useState<string>('Loading advice...');
//   const [loading, setLoading] = useState(true);
//   const [selectedCity, setSelectedCity] = useState('Helsingborg');
//   const cities = ['Helsingborg', 'Stockholm', 'Gothenburg', 'Malmo'];

//   useEffect(() => {
//     let completedRequests = 0;

//     const fetchWeather = async () => {
//       try {
//         const apiKey = '350817c71258db050226dd69255c5ee7';
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric&lang=en`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: WeatherData = await response.json();
//         const raining = data.weather[0].main === 'Rain';
//         setIsRaining(raining);
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//         setIsRaining(false); // Fallback for offline or failed requests
//       } finally {
//         completedRequests += 1;
//         if (completedRequests === 2) {
//           setLoading(false);
//         }
//       }
//     };

//     const fetchAdvice = async () => {
//       try {
//         const response = await fetch('https://api.adviceslip.com/advice');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: AdviceSlip = await response.json();
//         setAdvice(data.slip.advice ?? 'Failed to load advice.');
//       } catch (error) {
//         console.error('Error fetching advice:', error);
//         setAdvice('No internet connection or failed to fetch advice.');
//       } finally {
//         completedRequests += 1;
//         if (completedRequests === 2) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchWeather();
//     fetchAdvice();
//   }, [selectedCity]);

//   const imageSrc = isRaining ? GymImage : JoggingImage;

//   if (loading) {
//     return <div className="text-center text-lg text-gray-700">Loading...</div>;
//   }

//   return (
//     <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-150">
//         <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Advice</h2>
//         <blockquote className="mb-6 p-4 bg-white text-center">
//           <p className="text-lg text-gray-700">{advice}</p>
//         </blockquote>
//         <img
//           src={imageSrc}
//           alt={isRaining ? 'Gym workout' : 'Jogging outside'}
//           className="mx-auto mb-6 w-full max-w-[500px] h-auto"
//         />
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daily Weather in {selectedCity}</h1>
// <div className="mt-4 flex flex-col items-center">
//   <div className="flex flex-col items-center mb-4">
//     <label htmlFor="citySelect" className="mb-2 text-gray-600">Choose a city:</label>
//     <select
//       id="citySelect"
//       value={selectedCity}
//       onChange={(e) => setSelectedCity(e.target.value)}
//       className="p-2 border rounded bg-white text-gray-700 w-full max-w-xs"
//     >
//       {cities.map((city) => (
//         <option key={city} value={city} className="text-gray-800">
//           {city}
//         </option>
//       ))}
//     </select>
//   </div>
//   <h3 className="text-lg text-gray-600 mt-4 text-center">Is it raining today?</h3>
//   <p className="text-xl font-semibold mt-1 text-gray-800 text-center">{isRaining ? 'Yes' : 'No'}</p>
//   <p className="text-md text-gray-600 mt-2 text-center">
//     {isRaining ? 'It is raining today, so hit the gym!' : 'Nice weather today - go for a jog!'}
//   </p>
// </div>
// </div>
//     </div>
//   );
// }

// export default App;