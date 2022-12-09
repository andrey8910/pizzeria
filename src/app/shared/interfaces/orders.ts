
export type statusOrder = "створено" | "в роботі" | "готове" | "видано";

export interface ProductParametersForOrder{
  id: number,
  size: {
    name: string,
    key: string,
     },
  quantity: number
}

  export interface Orders{
  clientId : number | undefined,
  creationTime : number,
  orderList : ProductParametersForOrder[],
  orderStatus : statusOrder,

}
