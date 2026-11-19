

const STORAGE_KEY = 'favoriteGames';

// お気に入り取得
export const getFavorites = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// お気に入り保存
export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );
};


















