export type CreateSortUrl = {
  url: string;
  slug: string;
  sortUrl: string;
};

export type SortUrlModel = {
  id: number;
  slug: string;
  url: string;
  visits: number;
  createdAt: string;
  updatedAt: string;
};
