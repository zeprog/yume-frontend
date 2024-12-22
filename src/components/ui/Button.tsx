import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, color }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-4 rounded-md text-white font-medium transition-transform transform hover:scale-105 ${color}`}
  >
    {label}
  </button>
);

export default Button;