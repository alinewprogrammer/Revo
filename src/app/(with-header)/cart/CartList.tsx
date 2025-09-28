"use client";

import React from "react";
import { useCart } from "@/providers/CartContext";
import Link from "next/link";

export default function CartList() {
  const { items, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="~p-4/6">
        <p className="mb-4">Your cart is empty.</p>
        <Link href="/build" className="underline">
          Continue building a board
        </Link>
      </div>
    );
  }

  return (
    <div className="~p-4/6">
      <ul className="space-y-3 mb-6">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between border border-zinc-200 rounded p-3 bg-white">
            <div className="text-sm">
              <div><span className="text-zinc-500">Deck:</span> {item.deckUid ?? "-"}</div>
              <div><span className="text-zinc-500">Wheels:</span> {item.wheelUid ?? "-"}</div>
              <div><span className="text-zinc-500">Trucks:</span> {item.truckUid ?? "-"}</div>
              <div><span className="text-zinc-500">Bolts:</span> {item.boltUid ?? "-"}</div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-700 text-sm border border-red-200 rounded px-3 py-1 ml-4"
            >
              Remove
            </button>
          </li>)
        )}
      </ul>

      <div className="flex items-center gap-3">
        <button
          onClick={clearCart}
          className="border border-zinc-300 rounded px-3 py-1 text-sm hover:bg-zinc-50"
        >
          Clear cart
        </button>
        <Link href="/build" className="underline text-sm">Add more</Link>
      </div>
    </div>
  );
}
