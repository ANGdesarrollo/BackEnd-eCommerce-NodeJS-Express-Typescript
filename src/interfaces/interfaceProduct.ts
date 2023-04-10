export interface IProductDTO {
  name: string;
  price: number;
  thumbnail: Thumbnail;
  stock: number;
  discount: number;
  category: string;
  details: string;
}

export interface IProduct {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  thumbnail: Thumbnail;
  stock: number;
  discount: number;
  category: string;
  soldQty: number;
  details: string;
}

interface Thumbnail {
  imgPath: string;
  backgroundPath: string;
}
