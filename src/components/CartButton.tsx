"use client";

import React from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { useCart } from "@/providers/CartContext";

export default function CartButton() {
  const { count } = useCart();
  const label = count === 1 ? "Cart (1)" : `Cart (${count})`;
  return (
    <ButtonLink href="/cart-simple" icon="cart" color="purple" aria-label={label}>
      <span className="md:hidden">{count}</span>
      <span className="hidden md:inline">{label}</span>
    </ButtonLink>
  );
}
