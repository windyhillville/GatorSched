import { useEffect, useState } from 'react';

export const useToday = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    // Optional: We can update 'today' every minute or at midnight
    const timer = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return today;
};
