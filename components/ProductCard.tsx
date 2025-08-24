"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { fetchProducts } from "../services/Product";
import { addToCart } from "../services/Cart";
import type { Product } from "../types/Product";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "next/navigation";

interface ProductCardProps {
  limit?: number;
  selectedCategory?: number | null;
}

const ProductCard = ({ limit, selectedCategory }: ProductCardProps) => {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const searchTerm = searchParams.get('search') || undefined;
        const response = await fetchProducts(searchTerm);
        setAllProducts(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.categoryId === selectedCategory
      );
    }

    // Apply limit if specified
    return limit ? filtered.slice(0, limit) : filtered;
  }, [allProducts, selectedCategory, limit]);

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
                <p className="text-gray-500 text-sm mb-1">{product.category?.name}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-gray-800 font-medium text-lg mb-4">
                  Rs. {product.price.toLocaleString()}
                </div>
                <button
                  onClick={() => handleAddToCart(Number(product.id))}
                  disabled={addingToCart === Number(product.id)}
                  className="mt-auto w-full border border-green-400 rounded-b-sm bg-green-400 text-white font-medium py-2 px-4 hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                  {addingToCart === Number(product.id) ? "Adding..." : "Add to cart"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            <div className="text-2xl mb-2">No products found</div>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;