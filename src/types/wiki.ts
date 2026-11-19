export type CategoryType = string[]
export type Platforms = string[]

export interface MicroCMSImage {
  url: string;
  height?: number;
  width?: number;
}

export interface WikiTitle {
  id: string;
  ContentName: string;
  gameID: string;
  TitleIMG: MicroCMSImage;
  Platform: Platforms;
  ReleaseDate: string;
  Gamegenre: string[];
  Subgenre?: string;
  officialUrl?: string;
}


export interface WikiCategories {
  id: string;
  parent: WikiTitle;
  index: string;
  CategoryID: string;
  ContentName: string;
}

export interface WikiPage {
  id: string;
  parent: WikiCategories;
  category: string;
  ContentName: string;
  slug: string;
  content: string;
  uniqueKey: string;
  thumbnail: MicroCMSImage;
  index: string;
  updatedAt: string
}

export interface WikiURLs {
  slug: string;
  parent: {
    parent: {
      gameID: string;
    };
  };
}

export interface WikiItem {
  id: string;
  title: string;
  codeName?: string;
  gameSlug: string;
  category: CategoryType;
  subcategory?: string;
  tier?: 'S' | 'A' | 'B' | 'C';
  matchingRate?: number;
  thumbnail?: {
    url: string;
  };
  statusAttributes?: {
    label: string;
    value: string | number;
  }[];
  description: string;
  clearanceLevel?: number;
  createdAt: string;
  updatedAt: string;
}