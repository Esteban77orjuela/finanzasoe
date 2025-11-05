//Componente que muestra un resumen mensual de presupuestos y gastos por categoría

import { useState, useMemo } from "react";
import { useFinanzasStore } from "../store/useFinanzasStore";
import { Gasto, Presupuesto } from "../types";
import EditarPresupuesto from "./EditarPresupuesto";
import EditarGasto from "./EditarGasto";

// Función principal del componente ResumenMensual
function ResumenMensual() {

  // Estados para manejar la quincena seleccionada y el mes
  const [gastoEditando, setGastoEditando] = useState<Gasto | null>(null);
  const [quincenaSeleccionada, setQuincenaSeleccionada] = useState<"primera" | "segunda" | "todas">("primera");
  const [presupuestoEditando, setPresupuestoEditando] = useState<Presupuesto | null>(null);
  const { categorias, presupuestos, gastos } = useFinanzasStore();
  const eliminarCategoria = useFinanzasStore((state) => state.eliminarCategoria);
  const eliminarGasto = useFinanzasStore((state) => state.eliminarGasto);
  const editarGasto = useFinanzasStore((state) => state.editarGasto);
  const [mesSelecionado, setMesSelecionado] = useState<string>(
    new Date().toLocaleString("es", { month: "long" })
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

  // Función para formatear valores monetarios
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);
  };

// Calculamos el resumen de presupuestos y gastos por categoría
const resumenPorCategoria = useMemo(() => {
  const categoriasFiltradas = categorias.filter((categoria) => {
    if (quincenaSeleccionada === "todas") {
      const tienePresupuesto = presupuestos.some(
        (p) => p.categoriaId === categoria.id && p.mes === mesSelecionado
      );
      const tieneGasto = gastos.some(
        (g) => {
          const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
          return g.categoriaId === categoria.id && mesGasto === mesSelecionado;
        }
      );
      return tienePresupuesto || tieneGasto;
    }
    // Solo la quincena seleccionada
    const tienePresupuesto = presupuestos.some(
      (p) =>
        p.categoriaId === categoria.id &&
        p.mes === mesSelecionado &&
        p.quincena === quincenaSeleccionada
    );
    const tieneGasto = gastos.some(
      (g) => {
        const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
        return (
          g.categoriaId === categoria.id &&
          mesGasto === mesSelecionado &&
          g.quincena === quincenaSeleccionada
        );
      }
    );
    return tienePresupuesto || tieneGasto;
  });
  const resultado = categoriasFiltradas.map((categoria) => {
    let presupuesto = 0;
    let totalGastos = 0;

    if (quincenaSeleccionada === "todas") {
      // Sumar ambos presupuestos y ambos gastos
      presupuesto = presupuestos
        .filter(
          (p) =>
            p.categoriaId === categoria.id &&
            p.mes === mesSelecionado
        )
        .reduce((sum, p) => sum + p.monto, 0);

      totalGastos = gastos
        .filter((g) => {
          const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
          return (
            g.categoriaId === categoria.id &&
            mesGasto === mesSelecionado
          );
        })
        .reduce((sum, g) => sum + g.monto, 0);
    } else {
      // Solo la quincena seleccionada
      presupuesto =
        presupuestos.find(
          (p) =>
            p.categoriaId === categoria.id &&
            p.mes === mesSelecionado &&
            p.quincena === quincenaSeleccionada
        )?.monto || 0;

      totalGastos = gastos
        .filter((g) => {
          const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
          return (
            g.categoriaId === categoria.id &&
            mesGasto === mesSelecionado &&
            g.quincena === quincenaSeleccionada
          );
        })
        .reduce((sum, g) => sum + g.monto, 0);
    }

    return {
      categoria,
      presupuesto,
      gastoReal: totalGastos,
      diferencia: presupuesto - totalGastos,
    };
  });

  return resultado;
}, [categorias, presupuestos, gastos, mesSelecionado, quincenaSeleccionada]);

  // Cálculo de totales
  const totalPresupuesto = resumenPorCategoria.reduce(
    (sum, item) => sum + item.presupuesto,
    0
  );

  // Sumar todos los gastos reales
  const totalGastos = resumenPorCategoria.reduce(
    (sum, item) => sum + item.gastoReal,
    0
  );

  // Diferencia entre total de presupuesto y total de gastos
  const diferencia = totalPresupuesto - totalGastos;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#536EC7] dark:text-cyan-300 tracking-wider">
        RESUMEN FINANCIERO
      </h2>
  
      {/* Selector de mes - Adaptativo al tema */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-64">
          <select
            id="mes-resumen"
            value={mesSelecionado}
            onChange={(e) => setMesSelecionado(e.target.value)}
            className="w-full p-3 bg-light-accent dark:bg-dark-accent border dark:border-gray-700 border-light-border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-light-accent-hover dark:focus:ring-cyan-400 appearance-none transition-colors duration-200"
            aria-label="Seleccionar mes para el resumen"
          >
            {meses.map((m) => (
              <option key={m} value={m} className="bg-light-accent dark:bg-gray-800">
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Selector de quincena - Adaptativo al tema */}      
      <div className="mb-4 flex justify-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="primera"
            checked={quincenaSeleccionada === "primera"}
            onChange={() => setQuincenaSeleccionada("primera")}
            className="form-radio"
          />
          Primera quincena
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="segunda"
            checked={quincenaSeleccionada === "segunda"}
            onChange={() => setQuincenaSeleccionada("segunda")}
            className="form-radio"
          />
          Segunda quincena
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="todas"
            checked={quincenaSeleccionada === "todas"}
            onChange={() => setQuincenaSeleccionada("todas")}
            className="form-radio"
          />
          Ambas quincenas
        </label>
      </div>
      
      {/* Tabla de resumen - Adaptativa al tema */}
      <div className="overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-light-border dark:border-gray-700 shadow-lg dark:shadow-2xl transition-colors duration-200">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left text-xs font-medium text-light-text dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                Categoría
              </th>
              <th className="py-4 px-6 text-right text-xs font-medium text-light-accent dark:text-cyan-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                Presupuesto
              </th>
              <th className="py-4 px-6 text-right text-xs font-medium text-light-accent dark:text-cyan-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                Gasto Real
              </th>
              <th className="py-4 px-6 text-right text-xs font-medium text-light-accent dark:text-cyan-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
                Estado
              </th>
              <th className="py-4 px-6 text-center ...">Acciones</th>
            </tr>
            
            
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-transparent">
            {resumenPorCategoria.length === 0 ? (
        <tr>
          <td colSpan={4} className="py-6 text-center text-gray-500 dark:text-gray-400">
            No hay datos disponibles para la selección actual.
          </td>
        </tr>
      ) : (
        resumenPorCategoria.map((item) => {
          const estadoColor = item.diferencia >= 0 
            ? "text-green-500 dark:text-green-400" 
            : "text-red-500 dark:text-red-400";

            const presupuestoFila = presupuestos.find(
              (p) =>
                p.categoriaId === item.categoria.id &&
                p.mes === mesSelecionado &&
                (quincenaSeleccionada === "todas" || p.quincena === quincenaSeleccionada)
);
  
      return (
        <tr key={item.categoria.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <td className="py-3 px-6 whitespace-nowrap">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: item.categoria.color || "#00FFFF" }}
              />
              <span className="text-gray-800 dark:text-gray-100 font-light">
                {item.categoria.nombre}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 whitespace-nowrap text-right text-gray-600 dark:text-gray-300 font-light">
            {formatearMoneda(item.presupuesto)}
          </td>
          <td className="py-3 px-6 whitespace-nowrap text-right text-gray-600 dark:text-gray-300 font-light">
            {formatearMoneda(item.gastoReal)}
          </td>
          <td className={`py-3 px-6 whitespace-nowrap text-right font-medium ${estadoColor}`}>
            {item.diferencia !== 0 ? formatearMoneda(item.diferencia) : "$0"}
          </td>
          <td className="py-3 px-6 text-center">
            {/* Mostrar botón para cada gasto de la categoría, mes y quincena */}
{gastos
  .filter(
    (g) =>
      g.categoriaId === item.categoria.id &&
      g.fecha.toLocaleString("es", { month: "long" }) === mesSelecionado &&
      (quincenaSeleccionada === "todas" || g.quincena === quincenaSeleccionada)
  )
  .map((gasto) => (
    <div key={gasto.id} className="inline-flex">
      <button
        onClick={() => {
          if (window.confirm("¿Eliminar este gasto?")) {
            eliminarGasto(gasto.id);
          }
        }}
        className="text-red-600 hover:text-red-800 mx-1"
        aria-label="Eliminar gasto"
      >
        🗑️
      </button>
      <button
        onClick={() => {
          setGastoEditando(gasto);
        }}
        className="text-blue-600 hover:text-blue-800 mx-1"
        aria-label="Editar gasto"
      >
        ✏️
      </button>
    </div>
  ))}
            {presupuestoFila && (
              <div className="inline-flex">
                <button
                  onClick={() => {
                    if (window.confirm("¿Eliminar este presupuesto?")) {
                      useFinanzasStore.getState().eliminarPresupuesto(presupuestoFila.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 mx-1"
                  aria-label="Eliminar presupuesto"
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    setPresupuestoEditando(presupuestoFila);
                    
                  }}
                  className="text-blue-600 hover:text-blue-800 mx-1"
                  aria-label="Editar presupuesto"
                >
                  ✏️
                </button>
              </div>
            )}
          </td>
        </tr>
      );
    })
  )}
</tbody>
          <tfoot className="bg-gray-50 dark:bg-gray-750 transition-colors duration-200">
            <tr>
              <td className="py-3 px-6 text-left text-gray-800 dark:text-gray-100 font-medium">TOTAL</td>
              <td className="py-3 px-6 text-right text-gray-800 dark:text-gray-100 font-medium">
                {formatearMoneda(totalPresupuesto)}
              </td>
              <td className="py-3 px-6 text-right text-gray-800 dark:text-gray-100 font-medium">
                {formatearMoneda(totalGastos)}
              </td>
              <td className={`py-3 px-6 text-right font-medium ${
                diferencia >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
              }`}>
                {formatearMoneda(diferencia)}
              </td>
              
            </tr>
            
          </tfoot>
        </table>
      </div>
      {presupuestoEditando && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <EditarPresupuesto 
      presupuesto={presupuestoEditando} 
      onGuardar={() => setPresupuestoEditando(null)} 
      onCancelar={() => setPresupuestoEditando(null)} 
    />
  </div>
)}
{gastoEditando && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <EditarGasto 
      gasto={gastoEditando} 
      onGuardar={() => setGastoEditando(null)} 
      onCancelar={() => setGastoEditando(null)} 
    />
  </div>
)}
    </div>
  );
}

export default ResumenMensual;
