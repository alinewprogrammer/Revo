"use client";

import React, { useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { useCustomizerControls } from "./context";
import { useCart } from "@/providers/CartContext";
import { asImageSrc } from "@prismicio/client";

export default function AddToCartButton() {
  const { selectedDeck, selectedWheel, selectedTruck, selectedBolt } = useCustomizerControls();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    const deckUid = typeof selectedDeck?.uid === "string" ? selectedDeck.uid : undefined;
    const wheelUid = typeof selectedWheel?.uid === "string" ? selectedWheel.uid : undefined;
    const truckUid = typeof selectedTruck?.uid === "string" ? selectedTruck.uid : undefined;
    const boltUid = typeof selectedBolt?.uid === "string" ? selectedBolt.uid : undefined;

    const deckTextureUrl = selectedDeck
      ? (asImageSrc(selectedDeck.texture, {
          rect: [20, 1550, 1000, 1000],
          width: 560,
          height: 320,
        }) || (typeof selectedDeck.texture?.url === "string" ? selectedDeck.texture.url : undefined))
      : undefined;

    const wheelTextureUrl = selectedWheel
      ? (asImageSrc(selectedWheel.texture, {
          rect: [20, 10, 850, 850],
          width: 96,
          height: 96,
        }) || (typeof selectedWheel.texture?.url === "string" ? selectedWheel.texture.url : undefined))
      : undefined;

    addItem({
      deckUid,
      wheelUid,
      truckUid,
      boltUid,
      deckTextureUrl,
      wheelTextureUrl,
      truckColor: typeof selectedTruck?.color === "string" ? selectedTruck.color : undefined,
      boltColor: typeof selectedBolt?.color === "string" ? selectedBolt.color : undefined,
    });
    setAdded(true);
    // reset feedback after a moment
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button onClick={onAdd} className="w-full">
      <ButtonLink href="#" color="lime" icon="plus" onClick={(e) => e.preventDefault()}>
        {added ? "Added!" : "Add to cart"}
      </ButtonLink>
    </button>
  );
}
