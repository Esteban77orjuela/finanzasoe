// Componente para editar un presupuesto
import React, { useState } from "react";
import { Presupuesto } from "../types";
import { useFinanzasStore } from "../store/useFinanzasStore";

interface Props {
    presupuesto: Presupuesto;
    onGuardar: () => void;
    onCancelar: () => void;
}   

const EditarPresupuesto = ({ presupuesto, onGuardar, onCancelar }: Props) => {
    const [monto, setMonto] = useState(presupuesto.monto);

    const editarPresupuesto = useFinanzasStore((state) => state.editarPresupuesto);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const presupuestoActualizado: Presupuesto = {
            ...presupuesto,
            monto,
        };
        
        editarPresupuesto(presupuestoActualizado);
        onGuardar();
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Editar presupuesto</h2>
            <form onSubmit={handleSubmit}>
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

export default EditarPresupuesto;