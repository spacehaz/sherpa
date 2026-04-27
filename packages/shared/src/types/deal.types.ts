import { DealStatus, ItemCategory } from '../enums'

export interface DealItem {
  id: string;
  title: string;
  category: ItemCategory;
}

export interface Deal {
  id: string;
  offerId?: string;
  requestId?: string;
  initiatorId: string;
  responderId: string;
  travelerId: string;
  agreedMarkupPercent?: number;
  agreedPrice?: number;
  status: DealStatus;
  createdAt: Date;
  updatedAt: Date;
  offer?: DealItem;
  request?: DealItem;
}

export interface DealMessage {
  id: string;
  dealId: string;
  senderId: string;
  message: string;
  proposedMarkupPercent?: number;
  createdAt: Date;
}
