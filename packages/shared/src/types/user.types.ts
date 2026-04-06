export interface User {
  id: string;
  email: string;
  name: string;
  gender?: string;
  hometown?: string;
  rating: number;
  createdAt: Date;
}
