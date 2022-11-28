export interface Pizza {
  id: number;
  title: string;
  description: string;
  minPrice: number;
  ingredients: string[];
  minWeight: number;
  imageBig: string;
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
