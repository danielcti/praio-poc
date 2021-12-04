export interface Order {
  id: number;
  merchant_id: number;
  client_id: number;
  food_id: number;
  status: string; // open | ongoing | finished | canceled
  total_price: number;
  payment_method: number;
  time_ordered: Date;
  time_delivered: Date;
  quantity: number;
}

export interface CreateOrderForm {
  client_id: number;
  merchant_id: number;
  food_id: number;
  payment_method: number;
  quantity: number;
}
