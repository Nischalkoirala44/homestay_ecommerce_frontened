"use client";

import { useState } from "react";
import { CartItemType } from "../services/Cart";
import CheckoutForm from "./CheckoutForm";
import { useAuth } from "../context/AuthContext";

interface CartPageProps {
  cartItems: CartItemType[];
  onClearCart: () => void;
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

const CartPage = ({
  cartItems,
  onClearCart,
  onClose,
  onIncrease,
  onDecrease,
}: CartPageProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();

  if (cartItems.length === 0)
    return (
      <div className="text-center text-gray-600 mt-20 text-lg px-4">
        Your Jhola is empty.
      </div>
    );

  const formatPrice = (price: number) => `Rs.${price.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col h-full max-w-lg w-full sm:max-w-lg md:max-w-2xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b">
        <h2 className="text-xl font-semibold">Your Jhola</h2>
        <button
          onClick={onClose}
          aria-label="Close cart"
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </header>

      {/* Cart Items */}
      <ul className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 rounded-lg p-4 shadow-sm gap-4"
          >
            {item.product.image && (
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="w-24 h-24 sm:w-20 sm:h-20 object-contain rounded-md bg-white border"
              />
            )}
            <div className="flex flex-col flex-1 w-full">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                {item.product.name}
              </h3>
              <p className="text-lg font-bold text-gray-900 mb-3">
                {formatPrice(item.product.price)}
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-medium"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="text-gray-800 font-semibold min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onIncrease(item.id)}
                  className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="border-t p-4 sm:p-6 bg-gray-50">
        <div className="flex justify-between text-gray-700 mb-2 sm:mb-3 text-base sm:text-lg">
          <span>Subtotal</span>
          <span className="font-semibold">
            {formatPrice(
              cartItems.reduce(
                (acc, i) => acc + i.product.price * i.quantity,
                0
              )
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2 sm:mb-4 text-base sm:text-lg">
          <span>Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg sm:text-xl text-black mb-4 sm:mb-6 border-t pt-3">
          <span>Total</span>
          <span>
            {formatPrice(
              cartItems.reduce(
                (acc, i) => acc + i.product.price * i.quantity,
                0
              )
            )}
          </span>
        </div>

        <button
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold text-lg mb-3"
          onClick={() => setShowCheckout(true)}
        >
          Checkout →
        </button>

        <button
          className="w-full text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 font-medium"
          onClick={onClearCart}
        >
          Clear Jhola
        </button>
      </div>

      {/* Checkout Form Modal */}
      {showCheckout &&
        (user ? (
          <CheckoutForm
            userId={user.id}
            onClose={() => setShowCheckout(false)}
            onSuccess={onClearCart}
          />
        ) : (
          <p className="text-red-500 p-4">You must be logged in to checkout.</p>
        ))}
    </div>
  );
};

export default CartPage;