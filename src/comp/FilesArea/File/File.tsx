
import styles from './File.module.css'
import Image from 'next/image'
import FolderIcon from '@mui/icons-material/Folder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'


export default function FileComp({
  FolderFileClick,
  data,
  isFolder
}) {
  
  return (
    <div
      className={styles.file}
      onClick={() => FolderFileClick(data.id, data.slug)}
    >
      <div className={styles.Icon}>
        {data.thumbnail?.url ? (
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