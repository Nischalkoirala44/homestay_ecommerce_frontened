"use client"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">Loading your experience...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'pt-24' : ''}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {user ? 'Welcome Back!' : 'Elevate Our Product'}
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            {user ? 'Discover our Products' : 'Premium products for modern living'}
          </p>
          {!user && (
            <div className="mt-10">
              <button 
                onClick={() => router.push('/login')}
                className="px-8 py-3.5 text-lg font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Join Now - Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            {user ? 'Featured Products' : 'Our Popular Picks'}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {user ? 'Handpicked just for you' : 'See what our customers love'}
          </p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard limit={4} />
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-lg shadow-md text-white bg-gray-900 hover:bg-gray-800 transition-all transform hover:scale-105"
            >
              Explore Full Collection
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      {!user && (
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Why Choose Us
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  {
                    name: 'Premium Quality',
                    description: 'All products meet our rigorous standards',
                    icon: '🛡️'
                  },
                  {
                    name: 'Fast Shipping',
                    description: 'Get your items in 2-3 business days',
                    icon: '🚚'
                  },
                  {
                    name: 'Secure Checkout',
                    description: 'Your payment information is protected',
                    icon: '🔒'
                  }
                ].map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl mx-auto">
                          {feature.icon}
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-white">{feature.name}</h3>
                        <p className="mt-2 text-base text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}