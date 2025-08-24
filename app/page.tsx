"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  
  type Product = {
    id: string | number;
    name: string;
    description: string;
    price: number;
    image?: string;
  };

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)

  // Fetch exactly 4 featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setProductsLoading(true)
        const response = await fetch('http://localhost:3005/api/products?limit=4')
        const data = await response.json()
        
        if (data.status === 200 && data.data) {
          // Ensure we only take the first 4 products
          const products = data.data.slice(0, 4)
          setFeaturedProducts(products)
        } else {
          console.error('Failed to fetch products:', data.message)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

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
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {user ? 'Welcome Back!' : 'HomeStay Store'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {user ? 'Discover our exclusive collection of premium products' : 'Premium products for modern living'}
            </p>
            {!user && (
              <div className="mt-6">
                <button 
                  onClick={() => router.push('/login')}
                  className="px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  Join Now - Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products - Exactly 4 Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {user ? 'Featured Products' : 'Our Popular Picks'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {user ? 'Handpicked just for you' : 'See what our customers love'}
            </p>
          </div>
          
          {productsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              {/* Grid specifically designed for 4 products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="h-56 bg-gray-100 overflow-hidden relative">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xl font-bold text-blue-600">${product.price}</span>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Most Love
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link 
                  href="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Explore Full Collection
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition Section */}
      {!user && (
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose HomeStay</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Experience the difference with our premium products and exceptional service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Premium Quality',
                  description: 'All products meet our rigorous standards for excellence and durability',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  )
                },
                {
                  name: 'Fast Shipping',
                  description: 'Get your items in 2-3 business days with our expedited delivery',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                    </svg>
                  )
                },
                {
                  name: 'Secure Checkout',
                  description: 'Your payment information is protected with industry-leading encryption',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors duration-300">
                  <div className="flex justify-center items-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}