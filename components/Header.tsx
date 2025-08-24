"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiShoppingCart, FiUser, FiLogIn, FiLogOut, FiSearch } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CartSummaryPage from "./CartSummaryPage";
import { useCart } from "../hooks/useCart";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isCartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { cartCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
  }, [isCartOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            HomeStay Store
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  isSearchFocused ? 'bg-white text-black' : 'bg-gray-700 text-white border-gray-600'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </form>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="flex items-center hover:text-blue-300 transition">
              <FiHome className="mr-1" /> Home
            </Link>
            <Link href="/products" className="flex items-center hover:text-blue-300 transition">
              <FaProductHunt className="mr-1" /> Products
            </Link>
            <Link href="/contact" className="flex items-center hover:text-blue-300 transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => router.push('/products')}
              className="md:hidden p-2 hover:text-blue-300 transition"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-blue-300 transition"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="flex items-center hover:text-blue-300 transition">
                  <FiLogIn className="mr-1" /> Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                >
                  Register
                </Link>
              </>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center hover:text-blue-300 transition relative"
            >
              <FiShoppingCart className="mr-1" /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
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
        style={{ minWidth: "510px" }}
      >
        <CartSummaryPage onClose={() => setCartOpen(false)} userId={user?.id} />
      </aside>
    </>
  );
}