"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string; // unique per added config
  deckUid?: string;
  wheelUid?: string;
  truckUid?: string;
  boltUid?: string;
  createdAt: number;
  // optional preview fields
  deckTextureUrl?: string;
  wheelTextureUrl?: string;
  truckColor?: string;
  boltColor?: string;
};

export type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "createdAt">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "revo_cart_v1";

export function CartProvider({ children }: { children?: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load from storage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  // persist to storage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "id" | "createdAt">) => {
    setItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        createdAt: Date.now(),
        ...item,
      },
    ]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem,
    removeItem,
    clearCart,
    count: items.length,
  }), [items, addItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
