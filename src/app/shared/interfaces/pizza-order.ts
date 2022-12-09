import { Pizza } from "./pizza";

export interface PizzaOrder extends Pizza{
  orderId: number,
  size : {
    name: string,
    key: string
  }
  weight : number,
  price : number,
  quantity: number
}


