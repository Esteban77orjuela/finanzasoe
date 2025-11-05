// Componente para mostrar y manejar las categorías de gastos
import { useState } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { Trash2, Edit, Save, X } from 'lucide-react';
import { Categoria } from "../types";

function ListaCategorias() {
  const categorias = useFinanzasStore((state) => state.categorias);
  const eliminarCategoria = useFinanzasStore((state) => state.eliminarCategoria);
  const editarCategoria = useFinanzasStore((state) => state.editarCategoria);
  const [categoriaEditando, setCategoriaEditando] = useState<string | null>(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoColor, setNuevoColor] = useState("#000000");

  // Ordenar las categorías alfabéticamente por nombre
  const categoriasOrdenadas = [...categorias].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  // Función para iniciar la edición de una categoría
  const iniciarEdicion = (categoria: Categoria) => {
    setCategoriaEditando(categoria.id);
    setNuevoNombre(categoria.nombre);
    setNuevoColor(categoria.color || "#000000");
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setCategoriaEditando(null);
    setNuevoNombre("");
    setNuevoColor("#000000");
  };

  // Función para guardar los cambios de la categoría
  const guardarEdicion = (id: string) => {
    if (nuevoNombre.trim() === "") {
      alert("El nombre de la categoría no puede estar vacío");
      return;
    }
    
    editarCategoria({
      id,
      nombre: nuevoNombre.trim(),
      color: nuevoColor
    });
    
    cancelarEdicion();
  };

  // Función para manejar la eliminación de una categoría
  const manejarEliminar = (id: string, nombre: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar la categoría "${nombre}"?\n\n⚠️ Advertencia: Esta acción también eliminará todos los presupuestos y gastos asociados a esta categoría.`
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
      <div className="max-h-96 overflow-auto rounded-lg border-gray-200 bg-gray-50 p-4">
        {/* Renderizado de la lista de categorías */}
        <ul className="flex flex-col gap-3">
          {categoriasOrdenadas.map((categoria) => (
            <li
              key={categoria.id}
              className="flex flex-col border p-3 rounded-lg shadow-sm bg-white"
            >
              {categoriaEditando === categoria.id ? (
                // Vista de edición
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={nuevoColor}
                      onChange={(e) => setNuevoColor(e.target.value)}
                      className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre de la categoría"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => guardarEdicion(categoria.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                      title="Guardar cambios"
                    >
                      <Save size={16} />
                      Guardar
                    </button>
                    <button
                      onClick={cancelarEdicion}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      title="Cancelar"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Vista normal
                <div className="flex items-center justify-between">
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
                    <button
                      onClick={() => iniciarEdicion(categoria)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 transition-colors rounded-full hover:bg-blue-50"
                      title={`Editar categoría ${categoria.nombre}`}
                      aria-label={`Editar categoría ${categoria.nombre}`}
                    >
                      <Edit size={18} />
                    </button>
                    {/* Botón para eliminar con ícono */}
                    <button
                      onClick={() => manejarEliminar(categoria.id, categoria.nombre)}
                      className="p-1.5 text-red-600 hover:text-red-800 transition-colors rounded-full hover:bg-red-50"
                      title={`Eliminar categoría ${categoria.nombre}`}
                      aria-label={`Eliminar categoría ${categoria.nombre}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
  


export default ListaCategorias;