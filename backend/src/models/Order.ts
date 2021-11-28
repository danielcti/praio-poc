export class Order {
    id:number | undefined;
    merchant_id:number | undefined;
    client_id:number | undefined;
    status:string | undefined;
    total_price:number | undefined;
    payment_method:number | undefined;
    time_ordered:Date | undefined;
    time_delivered:Date | undefined;
}