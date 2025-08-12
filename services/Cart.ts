const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3005";

import { AddToCartRequest, AddToCartResponse } from '../types/Cart';

export async function addToCart(payload: AddToCartRequest): Promise<AddToCartResponse> {
  const response = await fetch(`${API_URL}/api/products/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || 'Failed to add to cart';
    throw new Error(message);
  }


  const data: AddToCartResponse = await response.json();
  return data;
}
