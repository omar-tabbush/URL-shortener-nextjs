export interface Url {
  id: string;
  createdAt?: string;
  longUrl: string;
  shortUrl: string;
  updatedAt?: string;
  userId?: string;
  clicksCount?: number;
  clicks?: Click[];
}
