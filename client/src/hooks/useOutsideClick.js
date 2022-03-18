import { useEffect, useState } from 'react';

export const useOutsideClick = (ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblePicker = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const handleOutideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutideClick);
    };
  }, [ref]);

  return { visible, toggleVisiblePicker };
};
