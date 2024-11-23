import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectButtonProps {
  icon?: React.ReactNode; // Prop opcional para o ícone
  path: string; // Rota completa para o redirecionamento
  name: string
}

const RedirectButton: React.FC<RedirectButtonProps> = ({ icon, path ,name}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navega para a rota completa passada como prop
  };

  return (
    <button 
      type="button" 
      onClick={handleClick} 
      className="flex items-center gap-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-700"
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </button>
  );
};

export default RedirectButton;