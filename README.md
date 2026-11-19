# ExGameWiki（またはプロジェクト名）

Windowsのエクスプローラー風の階層UIを採用した、ゲームデータベース・攻略Wikiアプリケーションです。
直感的なフォルダ階層での情報整理と、高速な静的ページ表示を目的に個人開発しました。

- **公開URL:** https://your-domain.pages.dev
- **使用技術:** Next.js (App Router) / TypeScript / CSS Modules / microCMS / Cloudflare Pages

---

## 主な機能・特徴

- **エクスプローラー風UI:** フォルダと記事を階層構造で直感的にブラウジング可能（パンくずリスト・階層ツリー表示対応）
- **ヘッドレスCMS連携:** microCMSのコンテンツAPIと連携し、記事の追加・更新が容易
- **独自リッチテキスト拡張:** コードブロックや図表（Mermaid等）のフロントエンド側でのパース・描画処理
- **静的サイト生成 (SSG):** `generateStaticParams` を活用した高速なページ遷移とビルド最適化

---

## 技術スタック

| カテゴリ | 技術・ツール |
| :--- | :--- |
| **Frontend** | Next.js (App Router), React, TypeScript |
| **Styling** | CSS Modules (Pure CSS) |
| **CMS** | microCMS |
| **Hosting** | Cloudflare Pages (または Vercel) |

---

## 環境構築・ローカル起動手順

※自分用の再構築メモ

1. **リポジトリのクローン**
   ```bash
   git clone [https://github.com/aristosptolemy/my-game-wiki.git](https://github.com/aristosptolemy/my-game-wiki.git)
   cd your-repo