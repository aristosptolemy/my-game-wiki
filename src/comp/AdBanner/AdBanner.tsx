import styles from './AdBanner.module.css';

type AdBannerProps = {
  slotName?: string;
};

export default function AdBanner({ slotName = 'DEFAULT' }: AdBannerProps) {
  // 「本番ビルド(production)」かつ「有効化フラグがtrue」の両方を満たす場合のみ本番扱い
  const isProdBuild = process.env.NODE_ENV === 'production';
  const isAdsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  if (isProdBuild && isAdsEnabled) {
    return (
      <div className={`${styles.banner} ${styles.prod}`}>
        <span>[PROD] 本番用広告スペース ({slotName})</span>
        {/* 将来的にここへ実際の広告タグを入れる */}
      </div>
    );
  }

  // ローカル開発時(dev)や、本番サーバーでもフラグがfalseの時は常にこちら
  return (
    <div className={`${styles.banner} ${styles.dev}`}>
      <span>[TEST] テスト用広告枠 ({slotName})</span>
    </div>
  );
}