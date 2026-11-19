'use client';

import { useState } from 'react';
import styles from './AnchorAd.module.css';

type AnchorAdProps = {
  slotName?: string;
};

export default function AnchorAd({ slotName = 'BOTTOM_ANCHOR' }: AnchorAdProps) {
  // 閉じられたかどうかの状態管理
  const [isVisible, setIsVisible] = useState(true);

  // ×が押されたら何も描画しない
  if (!isVisible) {
    return null;
  }

  const isProd = process.env.NODE_ENV === 'production';
  const isAdsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';
  const showProdAd = isProd && isAdsEnabled;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.banner} ${showProdAd ? styles.prod : styles.dev}`}>
        {/* 閉じるボタン */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
          aria-label="広告を閉じる"
        >
          ×
        </button>

        {/* 広告本体 */}
        {showProdAd ? (
          <span>[PROD] 本番用アンカー広告 ({slotName})</span>
        ) : (
          <span>[TEST] テスト用アンカー広告 ({slotName})</span>
        )}
      </div>
    </div>
  );
}