export class Order {
    id:number | undefined;
    merchant_id:number | undefined; //required
    client_id:number | undefined; //required
    food_id:number | undefined; //required
    status:string | undefined; // open | ongoing | finished | canceled
    total_price:number | undefined;
    payment_method:number | undefined;
    time_ordered:Date | undefined;
    time_delivered:Date | undefined;
    quantity:number | undefined; //required
}