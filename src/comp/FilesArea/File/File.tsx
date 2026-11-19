
import styles from './File.module.css'
import Image from 'next/image'
import FolderIcon from '@mui/icons-material/Folder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import type {
  WikiTitle, WikiCategories, WikiPage
} from '@/types/wiki'

interface File {
  FolderFileClick: (id: string, slug?: string) => void;
  data: WikiTitle | WikiCategories | WikiPage;
  isFolder: boolean;
}

export default function FileComp({
  FolderFileClick,
  data,
  isFolder
}: File) {
  return (
    <div
      className={styles.file}
      onClick={() => {
        if ('slug' in data) {
          FolderFileClick(data.id, data.slug)
        } else {
          FolderFileClick(data.id)
        }
      }}
    >
      <div className={styles.Icon}>
        {'slug' in data ? (
          <Image
            src={data.thumbnail.url}
            alt=""
            width={150}
            height={150}
            className={styles.thumbnail}
            unoptimized
          />
        ) : isFolder ? (
          <FolderIcon
            fontSize="inherit"
            color="inherit"
          />
        ) : (
          <OpenInNewIcon
            fontSize="inherit"
            color="inherit"
          />
        )}
      </div>
      <div className={styles.ContentName}>
        {data.ContentName}
      </div>
    </div>
  )
}