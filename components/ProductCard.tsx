"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { fetchProducts } from "../services/Product"
import { addToCart } from "../services/Cart"
import type { Product } from "../types/Product"
import { ShoppingCart, Loader2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const ProductCard = () => {
  const { user, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts()
        setProducts(response)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert("You must be logged in to add items to the cart")
      return
    }
    
    const userId = user.id

    setAddingToCart(productId)
    try {
      const result = await addToCart({
        userId,
        productId,
        quantity: 1,
      })
      alert(result.message)
      console.log("Cart updated:", result.data)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setAddingToCart(null)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Loading products...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-red-600 text-xl">⚠</span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Something went wrong</h3>
          <p className="text-slate-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          {/* Product Image */}
          <div className="aspect-square bg-slate-50 relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
              priority
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 text-lg mb-2 line-clamp-2">{product.name}</h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(Number(product.id))}
              disabled={addingToCart === Number(product.id)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              {addingToCart === Number(product.id) ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard
