import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigateButtonProps {
  label: string;
  path: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleClick}>
      {label}
    </button>
  );
};

export default NavigateButton;
