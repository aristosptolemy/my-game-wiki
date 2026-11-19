import { getAllPages } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

import AdBanner from '@/comp/AdBanner/AdBanner'

export async function generateStaticParams() {
  const pages = await getAllPages();
  const result = pages.map((page) => ({
    titleSlug: page.parent.parent.gameID,
    slug: page.slug,
  }));
  return result
}

export default async function GameTitlePage({
  params,
}: {
  params: Promise<{
    titleSlug: string;
    slug: string;
  }>;
}) {
  const { titleSlug, slug } = await params;
  const pages = await getAllPages()
  const page = pages.find((row) => row.uniqueKey == `${titleSlug}_${slug}`)
  
  if (!page) {
    notFound();
  }

  const GameTitle = page.parent.parent.ContentName

  const titleImg = page.parent.parent.TitleIMG.url
  const officialSiteUrl = page.parent.parent.officialUrl || null

  const lastUpdatedAt = new Date(page.updatedAt).toLocaleString()
  
  return (
    <main className={styles.container}>
      <div className={styles.itemList}>
        <div className={styles.GameTitle}>
          <div className={styles.Title}>
            {GameTitle}
          </div>
        </div>

        <div className={styles.officialUrl}>
          {officialSiteUrl && (
            <div className={styles.URLlink}>
              <a
                href={officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.officialLink}
              >
                公式サイト ↗
              </a>
            </div>
          )}
        </div>
        
        <div className={styles.imgArea}>
          <img className={styles.img} src={titleImg}/>
        </div>

        <div className={styles.content}>
          <div className={styles.updateArea}>
            <div className={styles.updateLabel}>
              最終更新日時:
            </div>
            <div className={styles.updatedAt}>
              {lastUpdatedAt}
            </div>
          </div>
          <div className={styles.ContentArea}>
            {page.content && (
              <div
                className={styles.richText}
                dangerouslySetInnerHTML={{
                  __html: page.content,
                }}
              />
            )}
          </div>
        </div>

        <AdBanner />

      </div>
    </main>
  );
}