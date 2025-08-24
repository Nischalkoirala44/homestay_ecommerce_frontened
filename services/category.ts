// services/category.ts
const API_URL = "http://localhost:3005";

export interface Category {
    id: number;
    name: string;
    image?: string;
    description?: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/api/categories`);

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
    }

    const json = await res.json();
    return json.data as Category[];
};