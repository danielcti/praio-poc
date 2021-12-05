export class User {
  id: number | undefined;
  name: string | undefined; //required
  email: string | undefined; //required
  password_hash: string | undefined; //required
  is_active: boolean | undefined;
  last_time_active: Date | undefined;
  phone: string | undefined;
  photo_url: string | undefined;
  is_merchant: boolean | undefined;
  is_client: boolean | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  socket_id: string | undefined;
}
