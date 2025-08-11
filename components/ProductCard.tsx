"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchProducts } from "../services/Product";
import { Product } from "../types/Product";

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
        console.log("Fetched products:", response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            unoptimized
            className="w-auto h-auto"
            priority
          />
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <button>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
