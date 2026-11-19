'use client'

import {
  useMemo,
  useState,
  useSyncExternalStore
} from 'react'
import styles from './FolderTree.module.css'
import FolderArea from './Folder/Folder'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import CircularProgress from '@mui/material/CircularProgress';

import SearchIcon from "@mui/icons-material/Search";
import Tooltip from '@mui/material/Tooltip';

import CostomInput from '@/comp/CostomInput/CostomInput'


const KEY = "favorites";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("favoritesChanged", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favoritesChanged", callback);
  };
};

const getSnapshot = () => {
  return localStorage.getItem(KEY) ?? "[]";
};

const getServerSnapshot = () => {
  return null;
};



export default function GameFolderTree({
  Search,
  setSearch,
  Games,
  Categories,
  Pages,
  setSelectID,
  selectID
}) {
  const favoritesJSON = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isLoaded = favoritesJSON !== null;

  const favorites = useMemo<string[]>(() => {
    if (favoritesJSON === null) return [];

    return JSON.parse(favoritesJSON);
  }, [favoritesJSON]);

  const FavoritesChange = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    localStorage.setItem(KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event("favoritesChanged"));
  };

  const [faOpen, setFaOpen] = useState<boolean>(true)
  const [otOpen, setOtOpen] = useState<boolean>(true)

  const TreeData = useMemo(() => {
    return Games.map((game) => ({
      id: game.id,
      ContentName: game.ContentName,
      type: 'game' as const,

      children: Categories
        .filter((category) => category.parent?.id === game.id)
        .map((category) => ({
          id: category.id,
          ContentName: category.ContentName,
          type: 'category' as const,

          children: Pages
            .filter((page) => page.parent?.id === category.id)
            .map((page) => ({
              id: page.id,
              ContentName: page.ContentName,
              url: `${game.gameID}/${page.slug}`,
              type: 'page' as const,
              children: [],
            })),
        })),
    }))
  }, [Games, Categories, Pages])

  const GameLists = useMemo(() => {
    const keyword = Search.trim().toLowerCase()

    if (!keyword) return TreeData

    return TreeData.filter((game) =>
      game.ContentName.toLowerCase().includes(keyword)
    )
  }, [TreeData, Search])

  const FavoriteGames = useMemo(() => {
    return {
      Favorite: GameLists.filter((row) => favorites.includes(row.id)),
      Other: GameLists.filter((row) => !favorites.includes(row.id)),
    };
  }, [favorites, GameLists]);


  return (
    <div className={styles.FolderMain}>
      <div className={styles.SearchTop}>
        <CostomInput
          Search={Search}
          setSearch={setSearch}
          Placeholder='ゲーム検索'
        />
      </div>
      {!isLoaded ? (
        <div className={styles.TreeArea}>
          <CircularProgress size="3rem" aria-label="Loading…" />
        </div>
      ) : (
        <div className={styles.TreeArea}>
          <div className={styles.favorite}>
            <div className={styles.type}
              onClick={() => {
                setFaOpen(!faOpen)
              }}
            >
              {faOpen ? (
                <Tooltip
                  title='折りたたむ'
                  disableInteractive
                  placement="top"
                  followCursor={true}
                >
                  <KeyboardArrowDownIcon />
                </Tooltip>
              ) : (
                <Tooltip
                  title='展開する'
                  disableInteractive
                  placement="top"
                  followCursor={true}
                >
                  <KeyboardArrowRightIcon />
                </Tooltip>
              )}
              お気に入り
            </div>
            
            <div className={`${styles.faGames} ${faOpen ? styles.open : styles.close}`}>
              {FavoriteGames.Favorite.map((row) => (
                <FolderArea
                  key={`${row.type}-${row.id}`}
                  Data={row}
                  FavoritesChange={FavoritesChange}
                  favorites={favorites}
                  setSelectID={setSelectID}
                  selectID={selectID}
                />
              ))}
            </div>
          </div>

          <div className={styles.favorite}>
            <div className={styles.type}
              onClick={() => {
                setOtOpen(!otOpen)
              }}
            >
              {otOpen ? (
                <Tooltip
                  title='折りたたむ'
                  disableInteractive
                  placement="top"
                  followCursor={true}
                >
                  <KeyboardArrowDownIcon />
                </Tooltip>
              ) : (
                <Tooltip
                  title='展開する'
                  disableInteractive
                  placement="top"
                  followCursor={true}
                >
                  <KeyboardArrowRightIcon />
                </Tooltip>
              )}
              その他のゲーム
            </div>

            <div className={`${styles.faGames} ${otOpen ? styles.open : styles.close}`}>
              {FavoriteGames.Other.map((row) => (
                <FolderArea
                  key={`${row.type}-${row.id}`}
                  Data={row}
                  FavoritesChange={FavoritesChange}
                  favorites={favorites}
                  setSelectID={setSelectID}
                  selectID={selectID}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}