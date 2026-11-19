'use client'

import { useState } from 'react'
import styles from './Folder.module.css'

import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import DescriptionIcon from '@mui/icons-material/Description'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import Tooltip from '@mui/material/Tooltip';

interface TreeNode {
  id: string
  ContentName: string
  type: 'game' | 'category' | 'page'
  url: string
  children: TreeNode[]
}

interface Props {
  Data: TreeNode
  setSelectID: (id: string) => void
  favorites?: string[]
  FavoritesChange: (id: string, status: boolean) => void
  selectID: string
  level?: number
}

export default function FolderArea({
  Data,
  setSelectID,
  favorites,
  FavoritesChange,
  selectID,
  level = 0,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const isFolder = Data.type !== 'page'

  const idStatus = selectID == Data.id

  const SelectTooltipTitle = idStatus ?
    '表示中' : '開く'

  const favorite = favorites?.includes(Data.id) ?
    <Tooltip
      title="お気に入り解除"
      placement="top"
      followCursor={true}
      disableInteractive
      >
      <div
        className={styles.favorite}
        onClick={() => FavoritesChange(Data.id, true)}
      >★</div>
    </Tooltip>
     :
    <Tooltip
      title="お気に入り登録"
      placement="top"
      followCursor={true}
      disableInteractive
    >
      <div
        className={styles.favorite}
        onClick={() => FavoritesChange(Data.id, false)}
      >☆</div>
    </Tooltip>;

  const handleClick = (id: string) => {
    if (isFolder) {
      setSelectID(id)
    } else {
      window.open(
        Data.url,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  return (
    <div className={styles.folderMain}>
      <div
        className={`${styles.main} ${idStatus ? styles.selected : ''}`}
        style={{
          paddingLeft: `${level * 16 + 4}px`,
        }}
      >
        <button
          type="button"
          className={styles.arrow}
          onClick={() => setIsOpen(!isOpen)}
          disabled={!isFolder}
          aria-label={
            isFolder
              ? `${Data.ContentName}を${isOpen ? '閉じる' : '開く'}`
              : undefined
          }
          aria-expanded={isFolder ? isOpen : undefined}
        >
          {isFolder ? (
            isOpen ? (
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
            )
          ) : null}
        </button>
        <Tooltip
          title={SelectTooltipTitle}
          placement="top"
          followCursor={true}
          disableInteractive
        >
          <div
            className={styles.Row}
            onClick={() => handleClick(Data.id)}
          >
            <div
              className={styles.icon}
            >
              {isFolder ? (
                isOpen ? <FolderOpenIcon /> : <FolderIcon />
              ) : (
                <DescriptionIcon />
              )}

            </div>

            <div
              className={styles.name}
            >
              {Data.ContentName}
            </div>
          </div>
        </Tooltip>
        {level == 0 && (<>{favorite}</>)}

      </div>


      {isFolder && isOpen && (
        <div>
          {Data.children.map((child) => (
            <FolderArea
              key={`${child.type}-${child.id}`}
              Data={child}
              setSelectID={setSelectID}
              FavoritesChange={FavoritesChange}
              selectID={selectID}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}