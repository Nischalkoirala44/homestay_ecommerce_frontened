// components/CategoryFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
    id: number;
    name: string;
    image?: string;
    description?: string;
}

interface CategoryFilterProps {
    categories: Category[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(Number(categoryParam));
        } else {
            setSelectedCategory(null);
        }
    }, [searchParams]);

    const handleCategoryClick = (categoryId: number | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryId) {
            params.set('category', categoryId.toString());
        } else {
            params.delete('category');
        }

        // Remove search term when changing category
        params.delete('search');

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
            <div className="space-y-2">
                <button
                    onClick={() => handleCategoryClick(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === null
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    All Products
                </button>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;