// hooks/useCart.ts
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchCartItems, CartItemType } from "../services/Cart";

export const useCart = () => {
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

    const getCart = async () => {
      setLoading(true);
      try {
        const items = await fetchCartItems(user.id);
        setCartItems(items);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCart();
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

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.length;

  return {
    cartItems,
    cartCount,
    loading,
    error,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
