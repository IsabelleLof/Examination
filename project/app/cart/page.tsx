"use client";
import { useState } from "react";
import { Wonton, Dip, Drink } from "@/types/types";
import { useCart } from "@/cartContext";
import { postOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CartPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();
  const router = useRouter();
  const [eta, setEta] = useState<string | null>(null);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const itemIds = cart.map(
        (item: { item: Wonton | Dip | Drink }) => item.item.id
      );
      const orderData = await postOrder(itemIds);

      const etaTimestamp = new Date(orderData.order.eta);
      const currentTime = new Date();
      const timeInMinutes = Math.ceil(
        (etaTimestamp.getTime() - currentTime.getTime()) / 60000
      );

      setEta(timeInMinutes.toString());
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setEta(null);
  };

  const handleQuantityChange = (
    item: Wonton | Dip | Drink,
    action: "add" | "remove"
  ) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === item.id);

    if (existingItem) {
      if (action === "add") {
        updateItemQuantity(item, existingItem.quantity + 1);
      } else if (action === "remove" && existingItem.quantity > 1) {
        updateItemQuantity(item, existingItem.quantity - 1);
      } else if (action === "remove" && existingItem.quantity === 1) {
        removeItemFromCart(item);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <div className="flex justify-end">
        <Image src="/assets/cart.svg" alt="cart" width={30} height={30} />
      </div>

      <ul className="space-y-4">
        {cart.map((cartItem) => (
          <li
            key={cartItem.item.id}
            className="bg-gray-200 text-black font-bold rounded-lg p-4 mb-4 text-xl w-full max-w-md"
          >
            <div className="flex justify-between">
              <span className="flex-1">{cartItem.item.name}</span>
              <span className="flex-1 text-right relative">
                {cartItem.item.price * cartItem.quantity} SEK
              </span>
            </div>

            {/* Quantity Display */}
            <div className="text-sm font-normal lowercase">
              {cartItem.quantity} stycken
            </div>

            {/* Quantity Controls */}
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleQuantityChange(cartItem.item, "add")}
                className="bg-gray-300 text-black py-1 px-3 rounded-full"
              >
                +
              </button>
              <span className="text-lg font-bold">{cartItem.quantity}</span>
              <button
                onClick={() => handleQuantityChange(cartItem.item, "remove")}
                className="bg-gray-300 text-black py-1 px-3 rounded-full"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 w-full bg-shade-24-dark text-white p-3 rounded text-xl font-semibold flex justify-between">
        <span className="text-lg font-bold text-black">TOTALT</span>
        <span className="text-lg font-bold text-black">{cartTotal} SEK</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-coal text-white p-3 rounded text-xl font-semibold"
      >
        TAKE MY MONEY!
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-clay text-snow flex flex-col items-center justify-center z-50">
          <div className="text-center p-10 max-w-lg w-full">
            <Image
              src="/assets/boxtop.png"
              alt="boxtop"
              width={500}
              height={500}
            />
            <h2 className="text-4xl font-bold mb-6">DINA WONTON TILLAGAS!</h2>
            <p className="text-xl mb-6">ETA {eta} MIN</p>
            <p className="text-xs">#4KJWDSD2</p>
            <button className="mt-6 w-full bg-clay text-white border-2 border-white p-3 rounded text-xl font-semibold">
              SE KVITTO
            </button>
            <button className="mt-6 w-full bg-coal text-white p-3 rounded text-xl font-semibold">
              GÖR EN NY BESTÄLLNING
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
