import { User } from './User';

export class Rating {
    id:number | undefined;
    merchant_id:number | undefined; //required
    client_id:number | undefined; //required
    stars:number | undefined; //required
    date:Date | undefined;
    merchant: User | undefined;
    client: User | undefined;
}