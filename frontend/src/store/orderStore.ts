import { create } from "zustand";
import { Cup, Ingredient } from "../types/order";

// Состояние заказа и действия для его изменения
interface OrderState {
  selectedCup: Cup | null;
  selectedBase: Ingredient | null;
  selectedMilk: Ingredient | null;
  selectedSyrup: Ingredient | null;
  selectedTopping: Ingredient | null;
  setCup: (cup: Cup) => void;
  setBase: (base: Ingredient) => void;
  setMilk: (milk: Ingredient) => void;
  setSyrup: (syrup: Ingredient | null) => void;
  setTopping: (topping: Ingredient | null) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  selectedCup: null,
  selectedBase: null,
  selectedMilk: null,
  selectedSyrup: null,
  selectedTopping: null,
  setCup: (cup) => set({ selectedCup: cup }),
  setBase: (base) => set({ selectedBase: base }),
  setMilk: (milk) => set({ selectedMilk: milk }),
  setSyrup: (syrup) => set({ selectedSyrup: syrup }),
  setTopping: (topping) => set({ selectedTopping: topping }),
  clearOrder: () =>
    set({
      selectedCup: null,
      selectedBase: null,
      selectedMilk: null,
      selectedSyrup: null,
      selectedTopping: null,
    }),
}));
