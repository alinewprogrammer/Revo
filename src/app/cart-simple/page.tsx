"use client";

import { useCart } from "@/providers/CartContext";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";

function Preview({
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltColor,
}: {
  deckTextureUrl?: string;
  wheelTextureUrl?: string;
  truckColor?: string;
  boltColor?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-36 rounded-lg overflow-hidden bg-black/20 ring-1 ring-white/10">
        {deckTextureUrl ? (
          // deck background
          // eslint-disable-next-line @next/next/no-img-element
          <img src={deckTextureUrl} alt="deck" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        ) : null}
        {wheelTextureUrl ? (
          // a small wheel thumbnail at bottom-left
          // eslint-disable-next-line @next/next/no-img-element
          <img src={wheelTextureUrl} alt="wheel" className="absolute -bottom-2 -left-2 h-12 w-12 object-cover rounded-full border border-white shadow" />
        ) : null}
      </div>
      <div className="flex items-center gap-3 text-xs text-zinc-300">
        <span className="opacity-70">Trucks</span>
        <span className="inline-block h-4 w-4 rounded-full ring-1 ring-white/20" style={{ backgroundColor: truckColor || "#ddd" }} />
        <span className="opacity-70 ml-2">Bolts</span>
        <span className="inline-block h-3 w-3 rounded-full ring-1 ring-white/20" style={{ backgroundColor: boltColor || "#ddd" }} />
      </div>
    </div>
  );
}

export default function Page() {
  const { items, removeItem, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-texture bg-zinc-900 text-white">
      <div className="mx-auto w-full max-w-6xl ~px-4/6 ~py-6/10">
        <div className="flex items-center justify-between mb-6">
          <Heading as="h1" size="sm" className="mt-0">Your cart</Heading>
          <div className="flex items-center gap-2">
            <ButtonLink href="/" icon="skateboard" color="purple" size="sm">Home</ButtonLink>
            <ButtonLink href="/build" icon="plus" color="lime" size="sm">Build</ButtonLink>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="~p-6/10 rounded-lg bg-black/20 ring-1 ring-white/10">
            <p className="mb-4 text-zinc-300">Your cart is empty.</p>
            <ButtonLink href="/build" icon="plus" color="lime" size="sm">Build a board</ButtonLink>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-lg bg-black/20 ring-1 ring-white/10 px-4 py-3">
                  <Preview
                    deckTextureUrl={item.deckTextureUrl}
                    wheelTextureUrl={item.wheelTextureUrl}
                    truckColor={item.truckColor}
                    boltColor={item.boltColor}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-sm rounded px-3 py-1 bg-red-500/90 hover:bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCart}
                className="rounded px-3 py-1 text-sm bg-white/10 hover:bg-white/15 ring-1 ring-white/10"
              >
                Clear cart
              </button>
              <ButtonLink href="/build" icon="plus" color="lime" size="sm">Add more</ButtonLink>
              <ButtonLink href="/" icon="skateboard" color="purple" size="sm">Home</ButtonLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
