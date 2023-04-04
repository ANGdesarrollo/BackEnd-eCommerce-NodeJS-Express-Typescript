export interface IProduct {
  date: string;
  name: string;
  thumbnail: Thumbnail;
  stock: number;
  discount?: number;
  category: string;
  soldQty: number;
  details: Details[];
}

interface Thumbnail {
  main: string;
  background: string;
}

interface Details {
  description: string;
  name: string;
}
