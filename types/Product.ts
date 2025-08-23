// types/Product.ts
export interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    categoryId: number;
    category?: {
        id: number;
        name: string;
        image?: string;
        description?: string;
    };
}