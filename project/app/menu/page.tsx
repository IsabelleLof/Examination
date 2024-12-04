// MenuPage now only adds items to the cart (without quantity management).
// CartPage handles the quantity of each item, allowing users
// to add and remove quantities using the + and - buttons.

"use client";
import { useState, useEffect } from "react";
import { Menu, Wonton, Dip, Drink } from "@/types/types";
import CartButton from "@/components/cartButton";
import { useRouter } from "next/navigation";
import { useCart } from "@/cartContext";

const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-HipRojQEq5sRjt3s";
const TENANT_ID = "isabelle";

export default function MenuPage() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cart, addItemToCart, removeItemFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(`${BASE_URL}/menu`, {
          headers: {
            "x-zocom": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }

        const data: Menu = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error loading menu:", error);
        setError("Error loading menu.");
      }
    }

    fetchMenu();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!menu) {
    return <div>Loading...</div>;
  }

  // Function to add/remove items from the cart (only add items to the cart)
  const toggleCartItem = (item: Wonton | Dip | Drink) => {
    if (cart.some((cartItem) => cartItem.item.id === item.id)) {
      removeItemFromCart(item);
    } else {
      addItemToCart(item);
    }
  };

  const handleCartClick = () => {
    if (typeof window !== "undefined") {
      router.push("/cart");
    }
  };

  return (
    <main className="bg-dark-mint min-h-screen flex flex-col items-start px-4">
      <div className="flex justify-end items-center w-full p-4">
        <CartButton cartCount={cart.length} onClick={handleCartClick} />
      </div>
      <h1 className="text-snow font-bold text-4xl text-left w-full max-w-md text-shadow mb-2">
        MENY
      </h1>

      {/* Wonton Section */}
      <section className="bg-clay text-snow rounded-lg p-4 mb-4 text-xl w-full max-w-md text-shadow">
        <ul>
          {menu.items
            .filter((item) => item.type === "wonton")
            .map((item) => (
              <li
                key={item.id}
                className={`py-4 font-bold uppercase ${
                  cart.some((cartItem) => cartItem.item.id === item.id)
                    ? "bg-coal"
                    : ""
                }`}
                onClick={() => toggleCartItem(item)}
              >
                <div className="flex justify-between">
                  <span className="flex-1">{item.name}</span>
                  <span className="flex-1 text-right relative">
                    <span className="relative z-10">{item.price} SEK</span>
                  </span>
                </div>
                <div className="text-sm font-normal lowercase">
                  {item.ingredients.join(", ")}
                </div>
              </li>
            ))}
        </ul>
      </section>

      {/* Drink Section */}
      <section className="bg-clay text-snow rounded-lg p-4 mb-4 text-xl w-full max-w-md text-shadow">
        <div className="flex justify-between">
          <h2 className="text-white font-bold">DRICKA</h2>
          <span className="font-bold flex-1 text-right relative">19 SEK</span>
        </div>
        <ul className="flex flex-wrap gap-6">
          {menu.items
            .filter((item) => item.type === "drink")
            .map((item) => (
              <li
                key={item.id}
                className={`bg-shade-24-light text-snow text-sm rounded py-2 px-3 flex items-center justify-center ${
                  cart.some((cartItem) => cartItem.item.id === item.id)
                    ? "bg-coal"
                    : ""
                }`}
                onClick={() => toggleCartItem(item)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </section>

      {/* Dip Section */}
      <section className="bg-clay text-snow rounded-lg p-4 mb-4 text-xl w-full max-w-md text-shadow">
        <div className="flex justify-between">
          <h2 className="text-white font-bold">DIPSÅS</h2>
          <span className="font-bold flex-1 text-right relative">19 SEK</span>
        </div>
        <ul className="flex flex-wrap gap-6">
          {menu.items
            .filter((item) => item.type === "dip")
            .map((item) => (
              <li
                key={item.id}
                className={`bg-shade-24-light text-snow text-sm rounded py-2 px-3 flex items-center justify-center ${
                  cart.some((cartItem) => cartItem.item.id === item.id)
                    ? "bg-coal"
                    : ""
                }`}
                onClick={() => toggleCartItem(item)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
