// import React from 'react';

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   theme?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ value, onChange, className, theme, ...props }) => (
//   <input
//     value={value}
//     onChange={onChange}
//     className={`w-full p-3 rounded-md shadow-md outline-none ${className} ${theme === 'light' ? 'text-gray-800' : 'text-gray-100 bg-gray-700'}`}
//     {...props}
//   />
// );

// export default InputField;

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
  theme = 'light',
  ...props
}) => (
  <input
    value={value}
    onChange={onChange}
    className={`w-full p-3 rounded-md shadow-md outline-none focus:ring-2 ${
      theme === 'light'
        ? 'bg-white text-gray-800 focus:ring-blue-500'
        : 'bg-gray-600 text-gray-100 focus:ring-yellow-400'
    } ${className}`}
    {...props}
  />
);

export default InputField;