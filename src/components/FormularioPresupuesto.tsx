//Componente para agregar un presupuesto mensual

import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { Quincena } from "../types";

function FormularioPresupuesto() {
  const [monto, setMonto] = useState<string>("");
  const [categoriaId, setCategoriaId] = useState<string>("");
  const [mes, setMes] = useState<string>(
    new Date().toLocaleString("es", { month: "long" })
  );
  const { categorias, agregarPresupuesto } = useFinanzasStore();
  const [quincena, setQuincena] = useState<Quincena>("primera"); // [true, false]


  // Verifica si ya existe un presupuesto para la categoría, mes y quincena
  function presupuestoDuplicado(
    categoriaId: string,
    mes: string,
    quincena: Quincena
  ) {
    return useFinanzasStore
      .getState()
      .presupuestos.some(
        (p) =>
          p.categoriaId === categoriaId &&
          p.mes === mes &&
          p.quincena === quincena
      );
  }

  // Ordenar las categorías alfabéticamente por nombre
  const categoriasOrdenadas = [...categorias].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Maneja el envío del formulario
  const manejarAgregar = () => {
    if (!monto || !categoriaId || !mes || parseFloat(monto) <= 0) {
  alert("Por favor, completa todos los campos y usa un monto válido");
  return;
}
    if( presupuestoDuplicado(categoriaId, mes, quincena)) {
      alert(
        "Ya existe un presupuesto para esta categoría, mes y quincena"
      );
      return;
    }
    const nuevoPresupuesto = {
      id: crypto.randomUUID(),
      categoriaId,
      monto: parseFloat(monto),
      mes,
      quincena,
    };

    // Agregar el nuevo presupuesto al store
    agregarPresupuesto(nuevoPresupuesto);
    // Limpiar el formulario
    setMonto("");
    setCategoriaId("");
  };

  return (
    <div className="bg-light-surface dark:bg-dark-surface shadow-md rounded-xl p-4 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center text-light-text dark:text-dark-text">
        Establecer presupuesto
      </h2>

      {/* Mes */}
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
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            Primera
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="segunda"
              checked={quincena === "segunda"}
              onChange={() => setQuincena("segunda")}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            Segunda
          </label>
        </div>
        <label htmlFor="mes" className="block text-sm text-gray-600 mb-1">
          Mes:
        </label>
        <select
          id="mes"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Seleccionar mes"
        >
          {meses.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div className="mb-3">
        <label
          htmlFor="categoria-presupuesto"
          className="block text-sm text-gray-600 mb-1"
        >
          Categoría:
        </label>
        <select
          id="categoria-presupuesto"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Seleccionar categoría para presupuesto"
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
        <label
          htmlFor="monto-presupuesto"
          className="block text-sm text-gray-600 mb-1"
        >
          Monto presupuestado:
        </label>
        <input
          id="monto-presupuesto"
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Monto presupuestado"
        />
      </div>

      {/* Botón para agregar */}
      <button
        onClick={manejarAgregar}
        className="w-full bg-light-accent dark:bg-dark-accent text-white py-2 rounded-lg hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors"
      >
        Establecer presupuesto
      </button>
    </div>
  );
}

export default FormularioPresupuesto;
