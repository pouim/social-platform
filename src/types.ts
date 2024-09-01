export interface Content {
  _id: string;
  title: string;
  body: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  publishedAt: string | null;
  scheduledAt: string | null;
  socialMedia: string[];
}
