"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface CartItemType {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

interface CartSummaryPageProps {
  onClose: () => void;
}

const CartPage = ({
  cartItems,
  onClearCart,
  onClose,
  onIncrease,
  onDecrease,
}: {
  cartItems: CartItemType[];
  onClearCart: () => void;
  onClose: () => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}) => {
  if (cartItems.length === 0)
    return (
      <div className="text-center text-gray-600 mt-20 text-lg">
        Your Jhola is empty.
      </div>
    );

  const formatPrice = (price: number) =>
    `Rs.${price.toLocaleString("en-IN")}`;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Your Jhola</h2>
        <button
          onClick={onClose}
          aria-label="Close cart"
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      <ul className="flex-1 overflow-auto p-6 space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm gap-4"
          >
            {item.product.image && (
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="w-20 h-20 object-contain rounded-md bg-white border"
              />
            )}
            <div className="flex flex-col flex-1">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1">
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

      <div className="border-t p-6 bg-gray-50">
        <div className="flex justify-between text-gray-700 mb-3 text-lg">
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
        <div className="flex justify-between text-gray-700 mb-4 text-lg">
          <span>Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-xl mb-6 border-t pt-3">
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
          onClick={() => alert("Proceed to checkout")}
        >
          Checkout →
        </button>

        <button
          className="w-full text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 font-medium"
          onClick={onClearCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M9 6v12a2 2 0 002 2h2a2 2 0 002-2V6m-5 6v6m4-6v6M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2" />
          </svg>
          Clear Jhola
        </button>
      </div>
    </div>
  );
};

const CartSummaryPage = ({ onClose }: CartSummaryPageProps) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view your cart.");
      setLoading(false);
      return;
    }

    async function fetchCartItems() {
      try {
        const res = await fetch(
          `http://localhost:3005/api/products/${user?.id}/items`
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);

          if (res.status === 404) {
            setCartItems([]);
            return;
          }

          throw new Error(errorData?.message || "Failed to fetch cart items");
        }

        const data = await res.json();

        if (!data.data || data.data.length === 0) {
          setCartItems([]);
          return;
        }

        setCartItems(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [user]);

  const increaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-20 text-lg">
        Loading your cart...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 mt-20 text-lg">Error: {error}</div>
    );

  return (
    <div className="w-full max-w-md h-screen bg-white shadow-lg fixed right-0 top-0 flex flex-col z-50">
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
