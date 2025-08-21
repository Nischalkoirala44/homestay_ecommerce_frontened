const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3005";

import { AddToCartRequest, AddToCartResponse } from '../types/Cart';

export async function addToCart(payload: AddToCartRequest): Promise<AddToCartResponse> {
    const response = await fetch(`${API_URL}/api/products/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || 'Failed to add to cart';
        throw new Error(message);
    }

    const data: AddToCartResponse = await response.json();
    return data;
}

export interface CartItemType {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image?: string;
    };
}

export const fetchCartItems = async (userId: number): Promise<CartItemType[]> => {
    const res = await fetch(`${API_URL}/api/products/${userId}/items`);
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch cart items");
    }
    const data = await res.json();
    return data.data || [];
};

export const checkout = async (checkoutData: any): Promise<any> => {
    const response = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || 'Failed to checkout';
        throw new Error(message);
    }

    return await response.json();
};