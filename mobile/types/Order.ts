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

export interface UserOrder {
  merchant_name: string;
  client_name: string;
  food_name: string;
  total_price: number;
  status: OrderStatus;
  quantity: number;
  id: number;
  merchant_id: number;
  client_id: number;
  time_ordered: string;
  time_delivered: string;
}

export enum OrderStatus {
  open = "open",
  ongoing = "ongoing",
  finished = "finished",
  canceled = "canceled",
}
