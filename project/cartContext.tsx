"use client";

import { createContext, useContext, useState } from "react";
import { Wonton, Dip, Drink } from "@/types/types";

// Define item types for cart items
type CartItem = Wonton | Dip | Drink;

// Define CartContext types
type CartContextType = {
  cart: { item: CartItem; quantity: number }[]; // Store quantity of each item
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  updateItemQuantity: (item: CartItem, quantity: number) => void; // Update quantity of an item
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<{ item: CartItem; quantity: number }[]>([]);

  // Calculate total price of cart items
  const cartTotal = cart.reduce(
    (total, { item, quantity }) => total + item.price * quantity,
    0
  );

  // Add item to cart (or increase quantity if item already in cart)
  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItemIndex === -1) {
        return [...prevCart, { item, quantity: 1 }];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
    });
  };

  // Remove item from cart (or decrease quantity if more than 1)
  const removeItemFromCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItemIndex === -1) return prevCart;

      const updatedCart = [...prevCart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      return updatedCart;
    });
  };

  // Update item quantity directly
  const updateItemQuantity = (item: CartItem, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity = quantity;
      }
      return updatedCart;
    });
  };

  const value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
