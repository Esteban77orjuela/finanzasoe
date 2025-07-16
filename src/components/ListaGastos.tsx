// Componente para mostrar y manejar la lista de gastos

import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { Gasto } from "../types";

// Función principal del componente ListaGastos
function ListaGastos() {
  const { gastos, categorias, eliminarGasto } = useFinanzasStore();
  const [mesFiltro, setMesFiltro] = useState<string>("todos");

  
  // Estado para manejar la edición de un gasto
  const [gastoEditando, setGastoEditando] = useState<Gasto | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Lista de meses para el filtro
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

  // Función para formatear valores monetarios
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);
  };

  // Filtrar gastos por mes
  const gastosFiltrados = gastos.filter((gasto) => {
    if (mesFiltro === "todos") return true;

    const mesGasto = gasto.fecha.toLocaleString("es", { month: "long" });
    return mesGasto === mesFiltro;
  });

  // Ordenar gastos por fecha (más reciente primero)
  const gastosOrdenados = [...gastosFiltrados].sort(
    (a, b) => b.fecha.getTime() - a.fecha.getTime()
  );

  // Función para obtener el nombre de la categoría
  const obtenerNombreCategoria = (categoriaId: string) => {
    const categoria = categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nombre : "Categoría eliminada";
  };

  const gastosOrdenadosAZ = [...gastosFiltrados].sort((a, b) => {
    const nombreA = obtenerNombreCategoria(a.categoriaId).toLowerCase();
    const nombreB = obtenerNombreCategoria(b.categoriaId).toLowerCase();
    return nombreA.localeCompare(nombreB);
  });

  // Función para obtener el color de la categoría
  const obtenerColorCategoria = (categoriaId: string) => {
    const categoria = categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.color : "#gray";
  };

  if (gastos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Aún no has registrado ningún gasto.
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Historial de gastos
      </h2>

      {/* Filtro por mes */}
      <div className="mb-4 flex justify-center">
        <select
          id="mes-filtro"
          value={mesFiltro}
          onChange={(e) => setMesFiltro(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Filtrar por mes"
        >
          <option value="todos">Todos los meses</option>
          {meses.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-600 text-white font-semibold text-left">
                Fecha
              </th>
              <th className="py-2 px-4 bg-gray-600 text-white font-semibold text-left">
                Categoría
              </th>
              <th className="py-2 px-4 bg-gray-600 text-white font-semibold text-left">
                Descripción
              </th>
              <th className="py-2 px-4 bg-gray-600 text-white font-semibold text-right">
                Monto
              </th>
              <th className="py-2 px-4 bg-gray-600 text-white font-semibold text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {gastosOrdenadosAZ.map((gasto) => (
              <tr key={gasto.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {gasto.fecha.toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: obtenerColorCategoria(
                          gasto.categoriaId
                        ),
                      }}
                    ></div>
                    {obtenerNombreCategoria(gasto.categoriaId)}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {gasto.descripcion || "-"}
                </td>
                <td className="py-2 px-4 border-b text-right font-medium">
                  {formatearMoneda(gasto.monto)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => eliminarGasto(gasto.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Eliminar gasto de ${formatearMoneda(
                      gasto.monto
                    )}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button 
                  
                  >
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaGastos;
