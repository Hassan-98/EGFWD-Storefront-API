interface PopulatedProduct {
  product_id: number;
  product_name: string;
  product_price: string;
  product_category: string;
  quantity: number;
}

export interface Order {
  id?: number;
  user_id: number;
  status: string;
  products: PopulatedProduct[]
}

export interface CreateOrder {
  id?: number;
  user_id: number;
  status: string;
  products: {id: number, quantity: number}[]
}