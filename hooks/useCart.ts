// hooks/useCart.ts
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchCartItems, CartItemType } from "../services/Cart";

export const useCart = () => {
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't try to fetch cart if auth is still loading or user is not logged in
    if (authLoading) {
      return;
    }

    if (!user) {
      setError("You must be logged in to view your cart.");
      setLoading(false);
      setCartItems([]);
      return;
    }

    // Check if user ID is valid
    if (!user.id || isNaN(user.id)) {
      setError("Invalid user ID");
      setLoading(false);
      setCartItems([]);
      return;
    }

    const getCart = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching cart for user ID:", user.id);
        const items = await fetchCartItems(user.id);
        setCartItems(items);
      } catch (err: any) {
        console.error("Error fetching cart:", err);
        setError(err.message);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [user, authLoading]);

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
    loading: loading || authLoading,
    error,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};