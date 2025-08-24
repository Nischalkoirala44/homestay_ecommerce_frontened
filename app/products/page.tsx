"use client"
import { useAuth } from "../../context/AuthContext"
import ProductCard from "../../components/ProductCard"
import CategoryFilter from "../../components/CategoryFilter"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { fetchCategories, Category } from "../../services/category"
import { Loader2 } from "lucide-react"

export default function ProductsPage() {
    const { user } = useAuth()
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const categoryParam = searchParams.get('category')
        setSelectedCategory(categoryParam ? Number(categoryParam) : null)
    }, [searchParams])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            setError(null)
            try {
                const categoriesData = await fetchCategories()
                setCategories(categoriesData)
            } catch (err: any) {
                setError(err.message)
                console.error("Failed to fetch categories:", err)
            } finally {
                setLoading(false)
            }
        }

        getCategories()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-slate-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Loading categories...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-red-600 text-xl">⚠</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">Failed to load categories</h3>
                    <p className="text-slate-600 text-sm">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Explore Our Products
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover quality items for your needs across various categories
                    </p>
                </div>
            </div>

            {/* Category Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse by Category</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All Products
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Header with title */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedCategory 
                                ? `${categories.find(c => c.id === selectedCategory)?.name} Products`
                                : "All Products"
                            }
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {selectedCategory 
                                ? `${categories.find(c => c.id === selectedCategory)?.description || 'Products in this category'}`
                                : "Browse our complete collection of high-quality products"
                            }
                        </p>
                    </div>

                    {/* Products Display */}
                    <ProductCard selectedCategory={selectedCategory} />
                </div>
            </div>
        </div>
    )
}