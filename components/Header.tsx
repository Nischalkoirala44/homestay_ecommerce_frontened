"use client";
import Link from "next/link";
import { useState } from "react";
import { FiHome, FiShoppingCart, FiUser, FiLogIn, FiLogOut } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const [cartItems] = useState(3); // Example cart items count

    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    HomeStay Store
                </Link>

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
                    <Link href="/cart" className="flex items-center hover:text-blue-300 transition relative">
                        <FiShoppingCart className="mr-1" />
                        Cart
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems}
                            </span>
                        )}
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center hover:text-blue-300 transition">
                                <FiUser className="mr-1" /> Profile
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                    My Account
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                    <FiLogOut className="mr-2" /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center hover:text-blue-300 transition"
                            >
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
                </div>
            </div>
        </header>
    );
}