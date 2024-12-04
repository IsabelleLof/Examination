import Image from "next/image";

type CartButtonProps = {
  cartCount: number;
  onClick: () => void;
};

const CartButton: React.FC<CartButtonProps> = ({ cartCount, onClick }) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="bg-snow w-[64px] h-[64px] flex items-center justify-center rounded"
      >
        <Image src="/assets/cart.svg" alt="cart" width={30} height={30} />
      </button>
      {/* Display cart count if items are in the cart */}

      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red text-white rounded-full text-xs w-5 h-5 flex items-center justify-center translate-x-2 translate-y-0">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartButton;
