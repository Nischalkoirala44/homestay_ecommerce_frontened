// types.ts

export interface AddToCartRequest {
  userId: number;
  productId: number;
  quantity?: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string; 
}

export interface AddToCartResponse {
  status: number;
  data: CartItem;
  message: string;
}
