import { useState, useEffect } from 'react';

export const usePageBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Checks if the user is within 1px of the bottom of the page
      const bottom = Math.ceil(scrollHeight - scrollTop) <= clientHeight + 1;
      setIsBottom(bottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};