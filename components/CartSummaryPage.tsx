//CartSummaryPage.tsx

"use client";

import CartPage from "./CartItem";
import { useCart } from "../hooks/useCart";

interface CartSummaryPageProps {
  onClose: () => void;
  userId: number;
}

const CartSummaryPage = ({ onClose, userId }: CartSummaryPageProps) => {
  const { cartItems, loading, error, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  if (loading) return <p className="text-center mt-20">Loading your cart...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">Error: {error}</p>;

  return (
    <div className="w-full max-w-lg h-screen bg-white shadow-lg fixed right-0 top-0 flex flex-col z-50">
      <CartPage
        cartItems={cartItems}
        onClearCart={clearCart}
        onClose={onClose}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />
    </div>
  );
};

export default CartSummaryPage;