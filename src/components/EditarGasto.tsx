// Componente para editar un gasto
import React, { useState } from "react";
import { Gasto } from "../types";
import { useFinanzasStore } from "../store/useFinanzasStore";

interface Props {
    gasto: Gasto;
    onGuardar: () => void;
    onCancelar: () => void;
}

const EditarGasto = ({ gasto, onGuardar, onCancelar }: Props) => {
    const [descripcion, setDescripcion] = useState(gasto.descripcion || "");
    const [monto, setMonto] = useState(gasto.monto);

    const editarGasto = useFinanzasStore((state) => state.editarGasto);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const gastoActualizado: Gasto = {
            ...gasto,
            descripcion,
            monto,
        };
        
        editarGasto(gastoActualizado);
        onGuardar();
    };

    return (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Editar gasto</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Descripción:</label>
        <input 
          type="text" 
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          placeholder="Descripción"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Monto:</label>
        <input 
          type="number" 
          value={monto} 
          onChange={(e) => setMonto(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          placeholder="Monto"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          type="button" 
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
);
};

export default EditarGasto;
