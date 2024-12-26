// import React from 'react';

// const Header: React.FC = () => (
//   <h1 className="text-4xl font-bold mb-6 text-center">
//     Welcome to <span className="text-blue-300">Video Call App</span>
//   </h1>
// );

// export default Header;

import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({
  title = 'Bearloga',
  subtitle = 'Your cozy online den for connecting and watching together',
  theme = 'dark',
}) => (
  <header className="text-center mb-8">
    <h1
      className={`text-5xl font-extrabold tracking-wide ${
        theme === 'dark' ? 'text-yellow-400' : 'text-indigo-600'
      }`}
    >
      {title}
    </h1>
    <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{subtitle}</p>
  </header>
);

export default Header;