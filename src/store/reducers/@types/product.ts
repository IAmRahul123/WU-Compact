export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  popular?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  count: number;
}
export interface CartState {
  cart: Record<number, CartItem>;
  products: Product[];
}
