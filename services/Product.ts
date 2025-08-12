const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3005";
import { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/api/products`, { method: "GET" });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch product");
    }

    const json = await res.json();
    return json.data as Product[];
};




