export class Order {
  id: number | undefined;
  merchant_id: number | undefined; //required
  client_id: number | undefined; //required
  food_id: number | undefined; //required
  status: OrderStatus | undefined; // open | ongoing | finished | canceled
  total_price: number | undefined;
  payment_method: number | undefined;
  time_ordered: Date | undefined;
  time_delivered: Date | undefined;
  quantity: number | undefined; //required
}

export interface UserOrder {
  merchant_name: string;
  client_name: string;
  food_name: string;
  total_price: number;
  status: OrderStatus;
  quantity: number;
}

export enum OrderStatus {
  open = "open",
  ongoing = "ongoing",
  finished = "finished",
  canceled = "canceled",
}
