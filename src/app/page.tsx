
import styles from "./page.module.css";
import {
  getGames, getPages, getCategories,
} from "@/lib/microcms";

import ExplorerArea from '@/comp/ExplorerArea/Explorer'

export default async function Home() {
  const [games, pages, categories] = await Promise.all([
    getGames(),
    getPages(),
    getCategories()
  ]);

  const GamesSorted = games.toSorted(
    (a, b) => a.ContentName.localeCompare(b.ContentName)
  )

  const CategorySorted = categories.toSorted(
    (a, b) => Number(a.index) - Number(b.index)
  )
  
  const PagesSorted = pages
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => Number(a.index) - Number(b.index));

  return (
    <div className={styles.page}>
      <div className={styles.ExplorerArea}>
        <ExplorerArea
          Games={GamesSorted}
          Categories={CategorySorted}
          Pages={PagesSorted}
        />
      </div>
    </div>
  );
}
