'use client'

import styles from './FilesArea.module.css'
import { useMemo, useState } from 'react';
import Image from 'next/image'
import FolderIcon from '@mui/icons-material/Folder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import SearchIcon from "@mui/icons-material/Search";

import FileComp from './File/File'
import CostomInput from '@/comp/CostomInput/CostomInput'

export default function FilesArea({
  Datas,
  setSelectID
}) {
  const path = Datas.FilePath
  const Contents = Datas.Contents.data

  const [Search, setSearch] = useState<string>('')
  
  const sortedContents = useMemo(() => {
    // 1. データが空、または存在しない場合は空配列を返す（エラー防止）
    if (!Contents || Contents.length === 0) {
      return [];
    }

    // 2. 元データを壊さないようにコピーを作る
    const copied = [...Contents];
    const searchData = copied.filter((row) => row.ContentName.includes(Search))

    // 3. index プロパティがあるかで分岐（0の場合も考慮して undefined チェックが安全）
    if (Contents[0].index !== undefined && Contents[0].index !== null) {
      return searchData.sort((a, b) => Number(a.index) - Number(b.index));
    } else {
      // 文字列（ファイル名など）の昇順ソートは localeCompare を使う
      return searchData.sort((a, b) => 
        String(a.ContentName).localeCompare(String(b.ContentName), 'ja')
      );
    }
  }, [Contents, Search]);

  const isFolder = Datas.Contents.icon === 'folder'

  const FolderFileClick = (id, slug = '') => {

    if (isFolder) {
      setSelectID(id)
    } else {
      const gameID = Contents[0].parent.parent.gameID

      window.open(
        `/${gameID}/${slug}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  return (
    <div className={styles.mainArea}>
      <div className={styles.pathArea}>
        <div
          className={styles.path}
          onClick={() => setSelectID('')}
        >
          全ゲーム
        </div>

        {path.map((row) => (
          <div
            key={row.id}
            className={styles.path}
            onClick={() => setSelectID(row.id)}
          >
            {row.name !== '' && (
              <>
                <div className={styles.Arrow}>
                  <ArrowForwardIosIcon />
                </div>

                <div className={styles.pathName}>
                  {row.name}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={styles.searchTop}>
        <CostomInput
          Search={Search}
          setSearch={setSearch}
          Placeholder='検索ワード'
        />
      </div>

      <div className={styles.filesArea}>
        <div className={styles.files}>
          {sortedContents.map((row) => (
            <div
              key={row.id}
            >
              <FileComp
                FolderFileClick={FolderFileClick}
                isFolder={isFolder}
                data={row}
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}















