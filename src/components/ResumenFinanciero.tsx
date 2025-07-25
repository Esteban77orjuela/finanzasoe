// src/components/ResumenFinanciero.tsx
import React from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { useState } from "react";

// Función para formatear los números como moneda MXN
const formatoMoneda = (valor: number) =>
  valor.toLocaleString("es-CO", { style: "currency", currency: "COP" });


const ResumenFinanciero = () => {
  const [filtro, setFiltro] = React.useState<"mes" | "primera" | "segunda">("mes");

  // Store
  const calcularTotalPresupuestadoPorMes = useFinanzasStore((state) => state.calcularTotalPresupuestadoPorMes);
  const calcularTotalGastadoPorMes = useFinanzasStore((state) => state.calcularTotalGastadoPorMes);
  const calcularTotalPresupuestadoPorMesYQuincena = useFinanzasStore((state) => state.calcularTotalPresupuestadoPorMesYQuincena);
  const calcularTotalGastadoPorMesYQuincena = useFinanzasStore((state) => state.calcularTotalGastadoPorMesYQuincena);

  const mesActual = new Date().toLocaleString("es", { month: "long" });

  // Calcula los valores según el filtro
  const ingresos =
    filtro === "mes"
      ? calcularTotalPresupuestadoPorMes(mesActual)
      : calcularTotalPresupuestadoPorMesYQuincena(mesActual, filtro);

  const gastos =
    filtro === "mes"
      ? calcularTotalGastadoPorMes(mesActual)
      : calcularTotalGastadoPorMesYQuincena(mesActual, filtro);

  const balance = ingresos - gastos;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-4" >
            <button 
            className={filtro === "mes" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}
            onClick={()=> setFiltro ("mes")}
            >Mes</button>
            <button
            className={filtro === "primera" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}
            onClick={()=> setFiltro ("primera")}
            
            >1ra Quincena</button>
            <button
            className={filtro === "segunda" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}
            onClick={()=> setFiltro ("segunda")}
            >2da Quincena</button>
        </div>

    <div className="flex gap-6 mt-4">
      {/* Balance Total */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-400 min-w-[220px]">
        <div className="text-xl font-semibold">Balance Total</div>
        <div className="text-3xl font-bold text-green-500 mt-2">
          {formatoMoneda(balance)}
        </div>
      </div>
      {/* Ingresos */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400 min-w-[220px]">
        <div className="text-xl font-semibold">Ingresos (Mes)</div>
        <div className="text-3xl font-bold text-green-500 mt-2">
          {formatoMoneda(ingresos)}
        </div>
      </div>
      {/* Gastos */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400 min-w-[220px]">
        <div className="text-xl font-semibold">Gastos (Mes)</div>
        <div className="text-3xl font-bold text-red-500 mt-2">
          {formatoMoneda(gastos)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResumenFinanciero;