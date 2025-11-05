// Calculadora flotante minimalista para operaciones rápidas. No afecta los datos de finanzas.

import React, { useState } from "react";

const CalculadoraFlotante: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [pantalla, setPantalla] = useState("0");

  // Maneja la lógica de los botones de la calculadora (operaciones, limpiar, borrar, evaluar)
  function handleButtonClick(value: string) {
    if (value === "=") {
      try {
        const resultado = eval(pantalla);
        setPantalla(String(resultado));
      } catch (error) {
        setPantalla("Error");
      }
    } else if (value === "C") {
      setPantalla("0");
    } else if (value === "⌫") {
      setPantalla((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (pantalla === "Error") {
      setPantalla(value);
    } else {
      if (pantalla === "0" && !isNaN(Number(value))) {
        setPantalla(value);
      } else {
        setPantalla((prev) => prev + value);
      }
    }
  }

  return (
    <>
      {/* Botón flotante siempre visible */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        onClick={() => setVisible((v) => !v)}
        aria-label="Abrir calculadora"
      >
        🧮
      </button>

      {/* Calculadora flotante SOLO si visible */}
      {visible && (
        <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-64 z-50">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Calculadora</h2>
          <input
            type="text"
            value={pantalla}
            placeholder="0"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {/* Fila 1: C, ⌫ */}
            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors col-span-2" onClick={() => handleButtonClick("C")}>C</button>
            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors col-span-2" onClick={() => handleButtonClick("⌫")}>⌫</button>
            {/* Fila 2 y siguientes: números y operadores */}
            {["7", "8", "9", "/",
              "4", "5", "6", "*",
              "1", "2", "3", "-",
              "0", ".", "=", "+"].map((btn) => (
              <button
                key={btn}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CalculadoraFlotante;