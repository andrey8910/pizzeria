import { Pizza } from "./pizza";

export interface PizzaOrder extends Pizza{
  orderId: number,
  size : string,
  weight : number,
  price : number,
  quantity: number
}
