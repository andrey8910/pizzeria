
export type statusOrder = "створено" | "в роботі" | "готове" | "видано";

export interface ProductParametersForOrder{
  productId: number,
  size: {
    name: string,
    key: string,
     },
  quantity: number
}

  export interface Orders{
  clientId : number | null,
  creationTime : number,
  orderList : ProductParametersForOrder[],
  orderStatus : statusOrder,

}
