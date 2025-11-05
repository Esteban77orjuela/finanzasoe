// Componente para agregar una nueva categoría de gasto

import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";

function FormularioCategoria() {
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("#000000");
  const [esFijo, setEsFijo] = useState(false);

  const categorias = useFinanzasStore((state) => state.categorias);
  const agregarCategoria = useFinanzasStore((state) => state.agregarCategoria);

  // Maneja el envío del formulario
  const manejarAgregar = () => {
    if (nombre.trim() === "") {
      alert("Por favor, escribe un nombre para la categoría.");
      return;
    }

    // Verifica si el nombre ya existe
    const yaExiste = categorias.some(
      (cat) => cat.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
    );
    if (yaExiste) {
      alert(`La categoría "${nombre}" ya existe.`);
      return;
    }

    // Crea y guarda la nueva categoría
    const nuevaCategoria = {
      id: crypto.randomUUID(),
      nombre,
      color,
      esFijo,
    };

    agregarCategoria(nuevaCategoria);
    setNombre("");
    setColor("#000000");
    setEsFijo(false);
  };

  return (
    <div className="bg-light-surface dark:bg-dark-surface shadow-md rounded-xl p-4 w-full max-w-md mx-auto transition-colors duration-200">
      <h2 className="text-lg font-semibold mb-4 text-center text-light-text dark:text-dark-text">
        Agregar nueva categoría
      </h2>

      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent bg-white dark:bg-dark-surface text-light-text dark:text-dark-text"
      />

      <label className="text-sm text-light-text dark:text-dark-text mb-1 block">Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-4 h-10 w-16 p-1 rounded cursor-pointer"
      />

      <label className="flex items-center mb-4 gap-2">
        <input
          type="checkbox"
          checked={esFijo}
          onChange={(e) => setEsFijo(e.target.checked)}
          className="form-checkbox h-4 w-4 text-light-accent dark:text-dark-accent transition duration-150 ease-in-out"
        />
        Gasto fijo
      </label>

      <button
        onClick={manejarAgregar}
        className="w-full bg-light-accent dark:bg-dark-accent text-white py-2 rounded-lg hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors"
      >
        Agregar categoría
      </button>
    </div>
  );
}

export default FormularioCategoria;