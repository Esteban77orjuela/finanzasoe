// src/types/index.ts

export type Quincena = "primera" | "segunda";

// 🎨 Representa una categoría como "Internet", "Diezmo", etc.
export type Categoria = {
  id: string; // Un identificador único
  nombre: string; // Ej: "Arriendo"
  color?: string; // Color opcional para usarlo en la UI
  icono?: string; // Icono opcional
  esFijo?: boolean; // Si es un gasto fijo (ej: arriendo, internet)
};

// 💰 Representa un gasto real que ocurrió
export type Gasto = {
  id: string;
  categoriaId: string; // Para saber a qué categoría pertenece
  monto: number; // Cuánto se gastó
  fecha: Date; // Cuándo se hizo el gasto
  descripcion?: string; // Texto opcional (ej: "cuota moto")
  quincena: Quincena; // Primera o segunda quincena
  esFijo?: boolean; // Si es un gasto fijo (ej: arriendo, internet)
};

// 📊 Representa cuánto presupuestaste para una categoría en un mes
export type Presupuesto = {
  id: string;
  categoriaId: string;
  mes: string; // Ej: "Abril"
  quincena: Quincena; // Primera o segunda quincena
  monto: number; // Cuánto pensabas gastar
  esFijo?: boolean; // Si es un presupuesto fijo (ej: arriendo, internet)
};


