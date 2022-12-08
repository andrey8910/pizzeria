import {PizzaOrder} from './pizza-order'

export interface Orders{
  clientId : number | undefined,
  creationTime : number,
  orderList : PizzaOrder[]

}
