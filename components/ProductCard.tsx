"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { fetchProducts } from "../services/Product";
import { addToCart } from "../services/Cart";
import type { Product } from "../types/Product";
import { Loader2, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ProductCardProps {
  limit?: number;
}

const ProductCard = ({ limit }: ProductCardProps) => {
  const { user, loading: authLoading } = useAuth();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts();
        setAllProducts(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }, [allProducts, searchTerm, limit]);

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert("You must be logged in to add items to the cart");
      return;
    }

    const userId = user.id;
    setAddingToCart(productId);
    try {
      const result = await addToCart({
        userId,
        productId,
        quantity: 1,
      });
      alert(result.message);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Loading products...</span>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className="p-4">
      {/* Only show search bar when not limited */}
      {!limit && (
        <div className="flex items-center gap-2 mb-6 border rounded-lg px-3 py-2 max-w-md mx-auto text-black bg-white shadow-sm">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-square bg-white p-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow border-t">
                <p className="text-gray-500 text-sm mb-1">{product.name}</p>
                <h3
                  className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
                  title={product.description}
                >
                  {product.description}
                </h3>
                <div className="text-gray-800 font-medium text-lg mb-4">
                  Rs. {product.price.toLocaleString()}
                </div>
                <button
                  onClick={() => handleAddToCart(Number(product.id))}
                  disabled={addingToCart === Number(product.id)}
                  className="mt-auto w-full border border-green-400 rounded-b-sm bg-green-400 text-white font-medium py-2 px-4"
                >
                  {addingToCart === Number(product.id) ? "Adding..." : "Add to cart"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;