import { ItemCategory, RequestStatus } from '../enums';

export interface Request {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: ItemCategory;
  store?: string;
  priceOriginal: number;
  markupPercent: number;
  deliveryDate: Date;
  size?: string;
  from?: string;
  to: string;
  weight?: number;
  imageUrl?: string;
  status: RequestStatus;
  createdAt: Date;
}
