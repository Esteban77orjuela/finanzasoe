// Componente para la aplicación principal

import React, { useEffect } from "react";
import "./App.css";
import FormularioCategoria from "./components/FormularioCategoria";
import ListaCategorias from "./components/ListaCategorias";
import FormularioGasto from "./components/FormularioGasto";
import FormularioPresupuesto from "./components/FormularioPresupuesto";
import ResumenMensual from "./components/ResumenMensual";
import ListaGastos from "./components/ListaGastos";
import ThemeToggle from "./components/ThemeToggle";
import CalculadoraFlotante from "./components/CalculadoraFlotante";
import { Toaster } from "react-hot-toast";
import ResumenFinanciero from "./components/ResumenFinanciero";

// Función principal del componente App
function App() {
  // Inicializar el tema al cargar la aplicación
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Si hay un tema guardado, aplicarlo
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Si no hay tema guardado, usar la preferencia del sistema
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg p-4 transition-colors duration-200">
      <Toaster position="top-right" />
      {/* Encabezado de la aplicación */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#536EC7] dark:text-dark-text">
          Mis Finanzas
        </h1>
        <ThemeToggle />
      </div>
      {/* Calculadora Flotante */}
      <CalculadoraFlotante />

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sección de Resumen - Ocupa todo el ancho en dispositivos pequeños */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-light-surface dark:bg-dark-surface rounded-xl shadow-md p-4 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">
            Resumen Mensual
          </h2>
          <ResumenFinanciero />
          <ResumenMensual />
        </div>

        {/* Sección de Categorías */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-md p-4 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">
            Categorías
          </h2>
          <FormularioCategoria />
          <ListaCategorias />
        </div>

        {/* Sección de Presupuestos */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-md p-4 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">
            Ingresos
          </h2>
          <FormularioPresupuesto />
        </div>

        {/* Sección de Gastos */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-md p-4 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">Gastos</h2>
          <FormularioGasto />
        </div>

        {/* Lista de Gastos - Ocupa todo el ancho en dispositivos pequeños */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-light-surface dark:bg-dark-surface rounded-xl shadow-md p-4 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">
            Historial de Gastos
          </h2>
          <ListaGastos />
        </div>
      </div>
    </div>
  );
}

export default App;
