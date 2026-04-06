import { ItemCategory, OfferStatus } from '../enums';

export interface Offer {
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
  weight?: number;
  status: OfferStatus;
  createdAt: Date;
}
