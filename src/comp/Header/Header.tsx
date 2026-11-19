import Link from "next/link";
import styles from "./Style.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ExGameWiki
        </Link>

        <nav className={styles.nav}>
          <Link href="/">ゲームを探す</Link>
        </nav>
      </div>
    </header>
  );
}