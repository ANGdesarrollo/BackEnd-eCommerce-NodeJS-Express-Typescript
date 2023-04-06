export interface IProduct {
  date: string;
  name: string;
  price: number;
  thumbnail: Thumbnail;
  stock: number;
  discount: number;
  category: string;
  soldQty: number;
  details: Details[];
}

interface Thumbnail {
  imgPath: string;
  backgroundPath: string;
}

interface Details {
  description: string;
  name: string;
}
