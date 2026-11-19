
import styles from "./page.module.css";
import {
  getGames, getPages, getCategories,
  getAllPages
} from "@/lib/microcms";

import ExplorerArea from '@/comp/ExplorerArea/Explorer'

export default async function Home() {
  const datas = await getAllPages()

  const Games = datas.map((row) => row.parent.parent)
  const games = [...new Map(
    Games.map((row) => [row.id, row])
  ).values()]

  const Categories = datas.map((row) => row.parent)
  const categories = [...new Map(
    Categories.map((row) => [row.id, row])
  ).values()]


  // const [games, pages, categories] = await Promise.all([
  //   getGames(),
  //   getPages(),
  //   getCategories()
  // ]);

  const GamesSorted = games.toSorted(
    (a, b) => a.ContentName.localeCompare(b.ContentName)
  )

  const CategorySorted = categories.toSorted(
    (a, b) => Number(a.index) - Number(b.index)
  )
  
  const PagesSorted = datas
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
