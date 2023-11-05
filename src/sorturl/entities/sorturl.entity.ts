export type CreateSortUrlRepo = {
  url: string;
  slug: string;
  sortUrl: string;
  userId: number;
};

export type SaveUrlCache = {
  url: string;
  slug: string;
  userId: number;
  ttl?: number;
};

export type CreateSortUrlService = {
  url: string;
  name?: string;
  userId: number;
  options?: {
    temporal?: boolean;
    ttl?: string;
  };
};

export type SortUrlModel = {
  id: number;
  userId: number;
  slug: string;
  url: string;
  sortUrl: string;
  visits: number;
  state: 1 | 0;
  createdAt: string;
  updatedAt: string;
};
