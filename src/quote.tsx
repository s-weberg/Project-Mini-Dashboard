
import { useState, useEffect } from 'react';
import JoggingImage from './assets/jogging.jpg';
import GymImage from './assets/gym.jpg';

interface QuoteData {
  content: string;
  author: string;
}

interface QuotesProps {
  isRaining: boolean;
}

const Quotes: React.FC<QuotesProps> = ({ isRaining }) => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data: QuoteData = await response.json();
        setQuote(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  const imageSrc = isRaining ? GymImage : JoggingImage;

  if (loading) {
    return <div>Loading quote...</div>;
  }

  return (
    <div>
      <blockquote>
        <p>{quote?.content}</p>
        <footer>{quote?.author}</footer>
      </blockquote>
      <img 
        src={imageSrc} 
        alt={isRaining ? 'Gym workout' : 'Jogging outside'} 
        style={{ width: '500px', height: 'auto' }} 
      />
      <p>
        {isRaining 
          ? 'It is raining today, so hit the gym!' 
          : 'Nice weather today - go for a jog!'
        }
      </p>
    </div>
  );
};

export default Quotes;