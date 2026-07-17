import type { Category } from "./category";

export interface EventRequest {
  name: string;
  description: string;
  categoryId: number;
  image: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  category?: Category;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
}