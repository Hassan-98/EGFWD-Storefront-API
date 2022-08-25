export interface Order {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
}

export interface ReturnedOrder {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
}
