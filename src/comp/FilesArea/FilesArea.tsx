'use client'

import styles from './FilesArea.module.css'
import { useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FileComp from './File/File'
import CostomInput from '@/comp/CostomInput/CostomInput'
import type {
  WikiTitle, WikiCategories, WikiPage
} from '@/types/wiki'

interface Files {
  setSelectID: (id: string) => void;
  Datas: {
    Contents: {
      data: WikiTitle[] | WikiCategories[] | WikiPage[];
      icon: string;
    }
    FilePath: {
      id: string;
      name: string;
    }[]
  }
}


export default function FilesArea({
  Datas,
  setSelectID
}: Files) {
  const path = Datas.FilePath
  const Contents = Datas.Contents.data

  const [Search, setSearch] = useState<string>('')
  
  const sortedContents = useMemo(() => {
    if (!Contents || Contents.length === 0) {
      return [];
    }

    const copied = [...Contents];
    const searchData = copied.filter((row) => row.ContentName.includes(Search))

    if ("index" in searchData[0]) {
      return searchData.sort((a, b) => {
        const indexA = "index" in a ? Number(a.index) : 0;
        const indexB = "index" in b ? Number(b.index) : 0;

        return indexA - indexB;
      });
    } else {
      return searchData.sort((a, b) => 
        String(a.ContentName).localeCompare(String(b.ContentName), 'ja')
      );
    }
  }, [Contents, Search]);

  const isFolder = Datas.Contents.icon === 'folder'

  const FolderFileClick = (id: string, slug = '') => {
    if ('content' in Contents[0]) {
      const gameID = Contents[0].parent.parent.gameID
      window.open(
        `/${gameID}/${slug}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else {
      setSelectID(id)
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















