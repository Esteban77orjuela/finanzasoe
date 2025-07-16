// Componente para alternar entre modo claro y oscuro

import React, { useEffect, useState } from 'react';

// Componente para el botón de alternancia de tema
const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // Efecto para aplicar el tema al cargar el componente
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Función para alternar el tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 focus:outline-none shadow-md ${darkMode ? 'bg-dark-bg border-2 border-dark-accent' : 'bg-gradient-to-r from-light-gradient-from to-light-gradient-to border-0'}`}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <span 
        className={`${darkMode ? 'translate-x-11' : 'translate-x-1'} inline-block h-8 w-8 transform rounded-full transition-transform duration-300 shadow-md`}
        style={{
          backgroundColor: darkMode ? '#0ea5e9' : '#ffffff',
        }}
      >
        {darkMode ? (
          // Icono de luna para modo oscuro
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Icono de sol para modo claro
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 text-light-accent" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;