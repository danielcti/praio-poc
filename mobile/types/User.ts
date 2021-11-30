export interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  is_client: boolean;
  is_merchant: boolean;
}

export interface LoginUserForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  last_time_active: Date;
  phone: string;
  photo_url: string;
  is_merchant: boolean;
  is_client: boolean;
  latitude: number;
  longitude: number;
}

export interface Authentication {
  auth: boolean;
  token: string;
  user: User;
}
