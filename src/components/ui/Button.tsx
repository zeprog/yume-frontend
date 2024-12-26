// import React from 'react';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   label: string;
//   color?: string; // Опциональный цвет
// }

// const Button: React.FC<ButtonProps> = ({ label, color, className, ...props }) => (
//   <button
//     className={`py-3 px-4 rounded-md font-medium transition-transform transform hover:scale-105 ${color || 'bg-blue-600 text-white'} ${className}`}
//     {...props}
//   >
//     {label}
//   </button>
// );

// export default Button;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'gradient' | 'outline';
  size?: 'small' | 'medium' | 'large';
  theme?: 'light' | 'dark';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'medium',
  theme = 'dark',
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-bold rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    solid: theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-400 text-black hover:bg-blue-500',
    gradient:
      'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600',
    outline: theme === 'dark' ? 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' : 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white',
  };
  const sizeStyles = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;