const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3005";
import { Product } from "../types/Product";

export const fetchProducts = async (search?: string): Promise<Product[]> => {
  let url = `${API_URL}/api/products`;
  if (search) url += `?search=${encodeURIComponent(search)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch products");
  }

  const json = await res.json();
  return json.data as Product[];
};





