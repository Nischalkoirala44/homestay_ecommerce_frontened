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

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
  {user ? (
    <>
      <main>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Discover our amazing collection
          </p>
        </div>
        <ProductCard />
      </main>
    </>
  ) : (
    <>
      <div className="text-center mt-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to Home Stay
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Find the Product
        </p>
      </div>
    </>
  )}
</div>

    </>
  )
}
