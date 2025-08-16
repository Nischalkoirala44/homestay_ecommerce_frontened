"use client"
import { useAuth } from "../../context/AuthContext"
import ProductCard from "../../components/ProductCard"

export default function ProductsPage() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white py-16 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Explore Our Products
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover quality items for your needs
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Products Grid */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <ProductCard />
                </div>

            </div>
        </div>
    )
}