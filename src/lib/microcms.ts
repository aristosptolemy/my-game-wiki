import { cacheLife } from "next/cache";
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
  "use cache";
  cacheLife("max");
  return client.getAllContents<WikiTitle>({
    endpoint: "gametitles",
  });
};

export const getPages = async (): Promise<WikiPage[]> => {
  "use cache";
  cacheLife("max");
  return client.getAllContents<WikiPage>({
    endpoint: "pages",
    queries: {
      depth: 2,
    },
  });
};

export const getCategories = async (): Promise<WikiCategories[]> => {
  "use cache";
  cacheLife("max");
  return client.getAllContents<WikiCategories>({
    endpoint: "categories",
  });
};

// 1. 全アイテムの取得
export const getAllWikiItems = async (): Promise<WikiPage[]> => {
  try {
    return await client.getAllContents<WikiPage>({
      endpoint: 'pages',
    });
  } catch (error) {
    console.error('microCMS Fetch Error:', error);
    return [];
  }
};

// 2. 登録されている「ゲームタイトル（gameSlug）の一覧」を抽出
export const getAllGameSlugs = async (): Promise<string[]> => {
  const items = await getPages();
  const slugs = Array.from(new Set(items.map((item) => item.slug).filter(Boolean)));
  return slugs;
};

// 3. 特定のゲームタイトルのアイテムだけを取得
export const getWikiItemsBySlug = async (gameSlug: string): Promise<WikiPage[]> => {
  const items = await client.getAllContents<WikiPage>({
    endpoint: "pages",
    queries: {
      depth: 2,
    },
  });
  
  //const items = await getAllWikiItems();
  return items.filter((item) => item.slug === gameSlug);
};

export const getPageBySlug = async (
  slug: string
): Promise<WikiPage | null> => {
  const response = await client.getList<WikiPage>({
    endpoint: 'pages',
    queries: {
      filters: `uniqueKey[equals]${slug}`,
      depth: 2,
      limit: 1,
    },
  });
  return response.contents[0] ?? null;
};

export const getPagesBySlug = async (): Promise<WikiURLs[]> => {

  const response = await client.getAllContents<WikiURLs>({
    endpoint: 'pages',
    queries: {
      fields: ['slug', 'parent.parent.gameID'],
      depth: 2,
    },
  });

  return response;
};



export const getALLExPages = async (): Promise<WikiPage[]> => {
  return client.getAllContents<WikiPage>({
    endpoint: "pages",
    queries: {
      fields: [
        'id',
        'ContentName', 'slug',
        'index', 'thumbnail',
        'parent'
      ],
      depth: 2,
    },
  });
};

export const getALLExTitles = async (): Promise<WikiTitle[]> => {
  return client.getAllContents<WikiTitle>({
    endpoint: "gametitles",
    queries: {
      fields: [
        'id',
        'ContentName', 'gameID',
        'TitleIMG', 'Platform',
        'Gamegenre'
      ],
      depth: 2,
    },
  });
};