// type  Checkout.ts

export interface CheckoutPayload {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    district: string;
    deliveryAddress: string;
    postalCode: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
}

export interface OrderResponse {
    status: number;
    data: {
        id: number;
        userId: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        district: string;
        deliveryAddress: string;
        postalCode: string;
        totalAmount: number;
        items: OrderItem[];
    };
    message: string;
}