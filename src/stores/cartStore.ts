import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';
import { Product } from '@services/productApi';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  changeQty: (productId: number, delta: number) => void;
  totalQuantity: () => number;
  totalAmount: (multiplier: number) => number;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },
      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },
      changeQty: (productId, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.product.id === productId) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter(Boolean) as CartItem[],
        }));
      },
      totalQuantity: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
      totalAmount: (multiplier) => {
        return get().items.reduce((sum, i) => sum + Math.round(i.product.price * multiplier) * i.quantity, 0);
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);