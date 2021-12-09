export interface Food {
  id: number;
  name: string;
  photo_url: string;
  price: number;
  description: string;
  avaliable_quantity: number;
  category: string;
  merchant_id: number;
}

export interface CreateFoodForm {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface UpdateFoodForm {
  name: string;
  price: number;
  description: string;
  category: string;
  id: number;
  merchant_id: number;
}
