import Link from 'next/link';

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footers}>
      <nav>
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/contact">お問い合わせ</Link>
      </nav>
    </footer>
  );
}