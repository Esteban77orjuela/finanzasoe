// src/store/useFinanzasStore.ts
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Categoria, Gasto, Presupuesto } from "../types";

type FinanzasStore = {
  eliminarPresupuesto(id: string): void;
  categorias: Categoria[];
  presupuestos: Presupuesto[];
  gastos: Gasto[];

  agregarCategoria: (categoria: Categoria) => void;
  eliminarCategoria: (id: string) => void;
  editarCategoria: (categoria: Categoria) => void;
  agregarPresupuesto: (presupuesto: Presupuesto) => void;
  agregarGasto: (gasto: Gasto) => void;
  eliminarGasto: (id: string) => void;
  editarPresupuesto: (presupuesto: Presupuesto) => void;
  editarGasto: (gasto: Gasto) => void;

  calcularTotalGastadoPorMes: (mes: string) => number;
  calcularTotalPresupuestadoPorMes: (mes: string) => number;
  calcularDiferenciaPorMes: (mes: string) => number;
  calcularTotalPresupuestadoPorMesYQuincena: (mes: string, quincena: "primera" | "segunda") => number;
  calcularTotalGastadoPorMesYQuincena: (mes: string, quincena: "primera" | "segunda") => number;
};

type FinanzasState = {
  categorias: Categoria[];
  presupuestos: Presupuesto[];
  gastos: Gasto[];
};

// Opciones de persistencia
const persistOptions: PersistOptions<FinanzasStore, FinanzasState> = {
  name: "finanzas-storage", // Nombre de la clave en localStorage
  partialize: (state) => ({
    categorias: state.categorias,
    presupuestos: state.presupuestos,
    gastos: state.gastos,
  }),
  // Convertimos las fechas de string a Date después de cargar del localStorage
  onRehydrateStorage: () => (state) => {
    if (state && state.gastos) {
      // Convertir fechas de string a objetos Date
      state.gastos = state.gastos.map((gasto) => ({
        ...gasto,
        fecha: new Date(gasto.fecha),
      }));
    }
  },
};

export const useFinanzasStore = create<FinanzasStore>()(
  persist(
    (set, get) => ({
      categorias: [],
      presupuestos: [],
      gastos: [],

      // 🧩 Agrega una nueva categoría al estado
      agregarCategoria: (categoria) => {
        set((state) => ({
          categorias: [...state.categorias, categoria],
        }));
      },

      // 🗑️ Elimina una categoría por su ID
      eliminarCategoria: (id) => {
        set((state) => ({
          categorias: state.categorias.filter((c) => c.id !== id),
          // También eliminar presupuestos y gastos asociados
          presupuestos: state.presupuestos.filter((p) => p.categoriaId !== id),
          gastos: state.gastos.filter((g) => g.categoriaId !== id),
        }));
      },

      // Eliminar un presupuesto por su ID
      eliminarPresupuesto: (id: string) => {
        set((state) => ({
          presupuestos: state.presupuestos.filter((p) => p.id !== id),
        }));
      },

      // Editar una categoría
      editarCategoria: (categoria: Categoria) => {
        set((state) => ({
          categorias: state.categorias.map((c) =>
            c.id === categoria.id ? categoria : c
          ),
        }));
      },

      // 💼 Agrega un nuevo presupuesto
      agregarPresupuesto: (presupuesto) => {
        const obtenerQuincena = (fecha: Date): "Primera" | "Segunda" => {
          const dia = fecha.getDate();
          return dia <= 15 ? "Primera" : "Segunda";
        }
        // Verificar si ya existe un presupuesto para esta categoría, mes y quincena
        const presupuestoExistente = get().presupuestos.find(
          (p) =>
            p.categoriaId === presupuesto.categoriaId &&
            p.mes === presupuesto.mes &&
            p.quincena === presupuesto.quincena
        );

        // Si existe, reemplazarlo; si no, agregar uno nuevo
        if (presupuestoExistente) {
          set((state) => ({
            presupuestos: state.presupuestos.map((p) =>
              p.id === presupuestoExistente.id ? presupuesto : p
            ),
          }));
        } else {
          set((state) => ({
            presupuestos: [...state.presupuestos, presupuesto],
          }));
        }
      },

      // 💸 Agrega un nuevo gasto real
      agregarGasto: (gasto) => {
        // Ya no necesitamos determinar la quincena aquí, ya viene en el objeto gasto
        set((state) => ({
          gastos: [...state.gastos, gasto],
        }));
      },

      // 🗑️ Elimina un gasto por su ID
      eliminarGasto: (id) => {
        set((state) => ({
          gastos: state.gastos.filter((g) => g.id !== id),
        }));
      },

      // ✏️ Edita un gasto existente
      editarGasto: (gasto) => {
        set((state) => ({
          gastos: state.gastos.map((g) =>
            g.id === gasto.id ? gasto : g
          ),
        }));
      },

      // editar un presupuesto
      editarPresupuesto: (presupuesto) => {
        set((state) => ({
          presupuestos: state.presupuestos.map((p) =>
            p.id === presupuesto.id ? presupuesto : p
          ),
        }));
      },

      // 🧮 Calcula cuánto se ha gastado en un mes
      calcularTotalGastadoPorMes: (mes) => {
        const gastos = get().gastos;
        return gastos
          .filter((g) => {
            const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
            return mesGasto === mes;
          })
          .reduce((total, g) => total + g.monto, 0);
      },

      // 🧮 Calcula el total presupuestado para un mes
      calcularTotalPresupuestadoPorMes: (mes) => {
        const presupuestos = get().presupuestos;
        return presupuestos
          .filter((p) => p.mes === mes)
          .reduce((total, p) => total + p.monto, 0);
      },

      // 🧮 Calcula el total presupuestado para un mes y quincena
      calcularTotalPresupuestadoPorMesYQuincena: (mes: string, quincena: "primera" | "segunda") => {
        const presupuestos = get().presupuestos;
        return presupuestos
          .filter((p) => p.mes === mes && p.quincena === quincena)
          .reduce((total, p) => total + p.monto, 0);
      },

      // 🧮 Calcula cuánto se ha gastado en un mes y quincena
      calcularTotalGastadoPorMesYQuincena: (mes: string, quincena: "primera" | "segunda") => {
        const gastos = get().gastos;
        return gastos
          .filter((g) => {
            const mesGasto = g.fecha.toLocaleString("es", { month: "long" });
            const quincenaGasto = g.fecha.getDate() <= 15 ? "primera" : "segunda";
            return mesGasto === mes && quincenaGasto === quincena;
          })
          .reduce((total, g) => total + g.monto, 0);
      },

      // 💡 Diferencia entre presupuestado y gastado
      calcularDiferenciaPorMes: (mes) => {
        const totalPresupuesto = get().calcularTotalPresupuestadoPorMes(mes);
        const totalGastado = get().calcularTotalGastadoPorMes(mes);
        return totalPresupuesto - totalGastado;
      },
    }),
    persistOptions
  )
);
