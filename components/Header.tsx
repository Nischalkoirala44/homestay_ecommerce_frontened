"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CartSummaryPage from "../components/CartItem";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
  }, [isCartOpen]);

  const cartCount = 3; // Replace with your actual cart count logic

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
          {/* Site Logo / Title */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition">
            My Shop
          </Link>

          {/* Navigation & Cart */}
          <nav className="flex items-center space-x-6">
            {/* Auth Buttons */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
              >
                Logout
              </button>
            )}

            {/* Cart Button */}
            <button
              aria-label="Open Cart"
              aria-expanded={isCartOpen}
              aria-controls="cart-sidebar"
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="2" />
                <circle cx="17" cy="21" r="2" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold select-none shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* Cart Sidebar */}
      <aside
        id="cart-sidebar"
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
          w-96 max-w-full`}
        style={{ minWidth: "380px" }}
      >
        <CartSummaryPage onClose={() => setCartOpen(false)} />
      </aside>
    </>
  );
};

export default Header;
