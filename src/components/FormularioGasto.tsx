// Componente para registrar un nuevo gasto

import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { Quincena } from "../types";

function FormularioGasto() {
  
  const [monto, setMonto] = useState<string>("");
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [quincena, setQuincena] = useState<Quincena>("primera");
  const { categorias, agregarGasto } = useFinanzasStore();

  const categoriasOrdenadas = [...categorias].sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Función para manejar el envío del formulario  
  const manejarAgregar = () => {
   if (!monto || !categoriaId || parseFloat(monto) <= 0) {
  alert("Por favor, ingresa un monto válido y selecciona una categoría");
  return;
}

    // Validar que el monto sea un número positivo
    const nuevoGasto = {
      id: crypto.randomUUID(),
      categoriaId,
      monto: parseFloat(monto),
      fecha: new Date(), // Guarda la fecha actual si la necesitas
      descripcion: descripcion.trim() ? descripcion : undefined,
      quincena,
    };

    // Agregar el nuevo gasto a la tienda
    agregarGasto(nuevoGasto);
    // Limpiar el formulario
    setMonto("");
    setCategoriaId("");
    setDescripcion("");
    setQuincena("primera");
  };

  return (
    <div className="bg-light-surface-one dark:bg-dark-surface shadow-md rounded-xl p-4 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center text-light-text dark:text-dark-text">
        Registrar gasto
      </h2>

      {/* Categoría */}
      <div className="mb-3">
        <label htmlFor="categoria" className="block text-sm text-gray-600 mb-1">
          Categoría:
        </label>
        <select
          id="categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Seleccionar categoría"
        >
          <option value="">Selecciona una categoría</option>
          {categoriasOrdenadas.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Monto */}
      <div className="mb-3">
        <label htmlFor="monto" className="block text-sm text-gray-600 mb-1">
          Monto:
        </label>
        <input
          id="monto"
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Monto del gasto"
        />
      </div>

      {/* Quincena */}
      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Quincena:
        </label>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="primera"
              checked={quincena === "primera"}
              onChange={() => setQuincena("primera")}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            Primera
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="segunda"
              checked={quincena === "segunda"}
              onChange={() => setQuincena("segunda")}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            Segunda
          </label>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-3">
        <label
          htmlFor="descripcion"
          className="block text-sm text-gray-600 mb-1"
        >
          Descripción (opcional):
        </label>
        <input
          id="descripcion"
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Descripción del gasto"
        />
      </div>

      {/* Botón para agregar */}
      <button
        onClick={manejarAgregar}
        className="w-full py-2 rounded-lg text-white transition-all duration-300 shadow-light-custom dark:shadow-none"
        style={{
          background: document.documentElement.classList.contains('dark') ?
            '#0ea5e9' : 
            'linear-gradient(to right, #ff6b35, #ff8c5a)'
        }}
      >
        Registrar gasto
      </button>
    </div>
  );
}

export default FormularioGasto;