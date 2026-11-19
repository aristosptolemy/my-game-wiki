import type { Metadata } from 'next';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ExGameWiki',
  description: '当サイトのプライバシーポリシーおよび免責事項について',
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>プライバシーポリシー</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>1. 個人情報の利用目的</h2>
        <p className={styles.text}>
          当サイトでは、お問い合わせ等の際に、お名前（ハンドルネーム）やメールアドレス等の個人情報をご入力いただく場合がございます。
          取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>2. 広告の配信について</h2>
        <p className={styles.text}>
          当サイトでは、第三者配信の広告サービス（Googleアドセンス、各種アフィリエイトサービス等）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
        </p>
        <p className={styles.text}>
          Cookieを無効にする方法やGoogleアドセンスに関する詳細は、「
          <a
            href="https://policies.google.com/technologies/ads?gl=jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            広告 – ポリシーと規約 – Google
          </a>
          」をご確認ください。
        </p>
      </section>

      {/* 以降、免責事項・著作権などを同様に記述 */}
    </div>
  );
}