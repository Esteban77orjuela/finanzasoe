/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Habilitamos el modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        // Colores para modo oscuro (azul/cian)
        'dark-bg': '#0f172a',
        'dark-surface': '#1e293b',
        'dark-accent': '#0ea5e9', // Azul cian brillante
        'dark-accent-hover': '#38bdf8',
        'dark-text': '#f1f5f9',
        
        // Colores para modo claro (inspirados en Renderforest)
        'light-bg': '#f8fafc',
        'light-surface': '#ffffff',
        'light-accent': '#ff6b35', // Naranja más vibrante
        'light-accent-hover': '#ff8c5a',
        'light-text': '#334155',
        'light-gradient-from': '#ff6b35', // Para degradados
        'light-gradient-to': '#ff8c5a',
        'light-border': '#e2e8f0',
        'light-input-bg': '#f8fafc',
        'light-shadow': 'rgba(255, 107, 53, 0.1)', // Sombra con color de acento
      },
      backgroundColor: {
        'gray-750': '#2D3748', // Color personalizado para hover en modo oscuro
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'light-custom': '0 4px 14px 0 rgba(255, 107, 53, 0.1)',
      },
    },
  },
  plugins: [],
};
