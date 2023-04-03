export interface IProduct {
  date: string;
  name: string;
  thumbnail: Thumbnail;
  stock: number;
  discount?: Discount;
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

interface Discount {
  percentage: number;
  expires_day: Date;
}
