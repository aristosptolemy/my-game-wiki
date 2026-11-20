import { cache } from 'react';

import { createClient } from 'microcms-js-sdk';
import {
  WikiPage, WikiTitle, WikiCategories,
  WikiURLs
} from '@/types/wiki';


export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export const getGames = async (): Promise<WikiTitle[]> => {

  return client.getAllContents<WikiTitle>({
    endpoint: "gametitles",
  });
};

export const getPages = async (): Promise<WikiPage[]> => {

  return client.getAllContents<WikiPage>({
    endpoint: "pages",
    queries: {
      depth: 2,
    },
  });
};

export const getCategories = async (): Promise<WikiCategories[]> => {

  return client.getAllContents<WikiCategories>({
    endpoint: "categories",
  });
};



export const getAllPages = cache(async (): Promise<WikiPage[]> => {
  const articles = await client.getAllContents<WikiPage>({
    endpoint: 'pages',
    queries: {
      depth: 2,
    },
    customRequestInit: {
      cache: process.env.NODE_ENV === 'development'
        ? 'no-store'
        : 'force-cache',
    },
  });

  return articles;
});











