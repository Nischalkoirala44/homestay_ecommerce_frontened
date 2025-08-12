"use client"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import ProductCard from "../components/ProductCard"
import Header from "../components/Header"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-6">Loading...</h1>
      </div>
    )
  }

  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Main content with padding-top to offset fixed header height */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center overflow-x-hidden">
        {user ? (
          <>
            <main className="min-h-screen bg-slate-50 rounded-md p-4">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Products</h1>
                <p className="text-slate-600">Discover our amazing collection</p>
              </div>
              <ProductCard />
            </main>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">Welcome to Home Stay</h1>
            <p className="text-xl mb-8">Find the Product</p>
          </>
        )}
      </div>
    </>
  )
}
