export interface Position {
  x: number;
  y: number;
}

export interface VineyardArea {
  id: string;
  name: string;
  description: string;
  position: Position;
  icon: string;
  color?: string;
  details?: Record<string, string[] | string>;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  href: string;
}

export interface Wine {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  vintage: string;
  varietal: string;
  price: string;
  isReserve?: boolean;
  href: string;
} 