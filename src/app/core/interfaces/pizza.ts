export interface SizeModel {
  weight: [
    { [key : string] : number }
  ],
  price: [
    { [key : string] : number }
  ],
  size: [
    { [key : string] : string }
  ],
  title: [
    { [key : string] : string }
    ]
}

export interface Pizza {
  id: number;
  title: string;
  description: string;
  minPrice: number;
  ingredients: string[];
  minWeight: number;
  imageBig: string;
  imageMain: string;
  params : SizeModel;
}
