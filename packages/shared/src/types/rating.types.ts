export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  dealId: string;
  score: number;
  comment?: string;
  createdAt: Date;
}
