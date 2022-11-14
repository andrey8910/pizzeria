export interface Pizza {
  id: number;
  title: string;
  minPrice: number;
  ingredients: string[];
  minWeight: number;
  imageMain: string;
  params: {
    weight: {
      small : number,
      medium : number,
      big : number
    },
    price: {
      small : number,
      medium : number,
      big : number
    }
  };

}
