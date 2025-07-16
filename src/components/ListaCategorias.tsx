// Componente para mostrar y manejar las categorías de gastos

import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";

function ListaCategorias() {
  const categorias = useFinanzasStore((state) => state.categorias);
  const eliminarCategoria = useFinanzasStore((state) => state.eliminarCategoria);
  const [categoriaEditando, setCategoriaEditando] = useState<string | null>(null);

  // Ordenar las categorías alfabéticamente por nombre
  const categoriasOrdenadas = [...categorias].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  // Función para manejar la eliminación de una categoría
  const manejarEliminar = (id: string, nombre: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`
      )
    ) {
      eliminarCategoria(id);
    }
  };

  // Si no hay categorías, mostramos un mensaje simple
  if (categorias.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Aún no has agregado categorías.
      </p>
    );
  }

  return (
    <div className="mt-6 w-full max-w-md mx-auto mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
        Categorías existentes
      </h3>
      <div className="max-h-48 overflow-auto rounded-lg border-gray-200 bg-gray-50">
        {/* Renderizado de la lista de categorías */}
        <ul className="flex flex-col gap-3">
          {categoriasOrdenadas.map((categoria) => (
            <li
              key={categoria.id}
              className="flex items-center justify-between border p-3 rounded-lg shadow-sm bg-white"
            >
              {/* Color de la categoría como círculo */}
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: categoria.color }}
                ></div>
                <span className="font-medium text-gray-800">
                  {categoria.nombre}
                </span>
              </div>
              <div className="flex gap-2">
                {/* Botón para editar con ícono */}
                <button
                  onClick={() => {
                    alert(`Editar categoría: ${categoria.nombre}`);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Editar categoría ${categoria.nombre}`}
                >
                  {/* ...icono... */}
                </button>
                {/* Botón para eliminar con ícono */}
                <button
                  onClick={() => manejarEliminar(categoria.id, categoria.nombre)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Eliminar categoría ${categoria.nombre}`}
                >
                  {/* ...icono... */}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListaCategorias;