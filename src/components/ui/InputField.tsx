import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme?: 'light' | 'dark';
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  className = '',
  theme = 'dark',
  ...props
}) => (
  <input
    value={value}
    onChange={onChange}
    className={`w-full p-3 rounded-md shadow-md outline-none ${
      theme === 'light'
        ? 'bg-white text-gray-800'
        : 'bg-gray-600 text-gray-100'
    } ${className}`}
    {...props}
  />
);

export default InputField;