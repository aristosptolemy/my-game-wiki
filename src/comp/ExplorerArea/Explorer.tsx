'use client'
import { useState, useMemo } from 'react'
import GameFolderTree from "@/comp/FolderTree/FolderTree";
import styles from './Explorer.module.css'
import FilesArea from '@/comp/FilesArea/FilesArea'


export default function ExplorerArea({
  Games,
  Pages,
  Categories
}) {
  const [Search, setSearch] = useState<string>('')
  const [selectID, setSelectID] = useState<string>('')

  const filesData = useMemo(() => {
    if (!selectID) {
      return {
        Contents: {
          data: Games,
          icon: 'folder'
        },
        FilePath: []
      }
    }

    // ゲームを選択した場合
    const game = Games.find((row) => row.id === selectID)

    if (game) {
      return {
        Contents: {
          data: Categories.filter(
            (row) => row.parent?.id === game.id
          ),
          icon: 'folder'
        },
        FilePath: [
          { id: game.id, name: game.ContentName }
        ]
      }
    }

    // カテゴリーを選択した場合
    const category = Categories.find(
      (row) => row.id === selectID
    )

    if (category) {
      const parentGame = Games.find(
        (row) => row.id === category.parent?.id
      )

      return {
        Contents: {
          data: Pages.filter(
            (row) => row.parent?.id === category.id
          ),
          icon: 'file'
        },
        FilePath: [
          ...(parentGame
            ? [{
                id: parentGame.id,
                name: parentGame.ContentName
              }]
            : []),
          {
            id: category.id,
            name: category.ContentName
          }
        ]
      }
    }

    return {
      Contents: {
        data: [],
        icon: 'file'
      },
      FilePath: []
    }

  }, [selectID, Games, Categories, Pages])

  return (
    <main className={styles.mainArea}>
      <div className={styles.FolderArea}>
        <GameFolderTree
          Search={Search}
          setSearch={setSearch}
          Games={Games}
          Categories={Categories}
          Pages={Pages}
          setSelectID={setSelectID}
          selectID={selectID}
        />
      </div>
      <div className={styles.FilesArea}>
        <FilesArea
          Datas={filesData}
          setSelectID={setSelectID}
        />
      </div>
    </main>
  )
}

































