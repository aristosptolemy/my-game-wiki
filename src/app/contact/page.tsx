import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせ | ExGameWiki',
};

export default function ContactPage() {
  const formID = '1FAIpQLSfY0bhJXqGY3kCvSOTkWOr0vlsmRYIJmhx5QV8hvCbUfLeXow'
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>お問い合わせ</h1>
      <p className={styles.description}>
        サイトの内容に関するご質問や、掲載情報の修正依頼などは以下のフォームよりご連絡ください。
      </p>

      <div className={styles.iframeWrapper}>
        <iframe
          src={`https://docs.google.com/forms/d/e/${formID}/viewform?embedded=true`}
          width="100%"
          height="800"
          frameBorder="0"
          title="お問い合わせフォーム"
        >
          読み込んでいます…
        </iframe>
      </div>
    </div>
  );
}