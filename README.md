# yataki-woody-land

八滝ウッディランド ([yataki-woody-land.net](https://yataki-woody-land.net/)) の静的サイト版です。
WordPress（Sydney テーマ）で運用していたサイトを [Eleventy](https://www.11ty.dev/) に移行し、見た目はそのままに静的サイトジェネレータで管理できるようにしました。

## 構成

- `src/` — サイトのソース（ページ、投稿、テンプレート、アセット）
  - `src/*.njk` — 固定ページ（施設案内・料金・アクセスなど）
  - `src/blog/`, `src/news/`, `src/facilities/` — お知らせ・ブログ・施設紹介の記事（各ディレクトリに `.njk` ファイルを追加すると自動的にページが増えます）
  - `src/_includes/` — 共通レイアウト（`base.njk` 全体の枠、`page.njk` 固定ページ、`post.njk` 記事、`sidebar.njk` サイドバーの最新記事一覧）
  - `src/wp-content/`, `src/wp-includes/` — 元サイトの CSS・JS・画像資産（そのまま流用し見た目を維持）
- `.eleventy.js` — Eleventy の設定
- `.github/workflows/deploy.yml` — GitHub Pages への自動デプロイ

## 記事の追加・編集

`src/blog/`, `src/news/`, `src/facilities/` の中に `.njk` ファイルを作成し、以下のような frontmatter を先頭に書いてください。

```
---
layout: post.njk
title: "記事タイトル"
headerTitle: "記事タイトル - 岐阜県関市のキャンプ場"
entryTitle: "記事タイトル"
description: "検索結果などに表示される説明文"
category: "ブログ"
categorySlug: blog
date: 2026-01-01T00:00:00+00:00
tags: ["posts"]
---
<p>本文（HTML）</p>
```

サイドバーの最新記事一覧やトップページのブログ一覧、`/blog/` `/news/` `/facilities/` の一覧ページは `tags: ["posts"]` を元に自動生成されます。

固定ページ（`camp.njk` など）は `layout: page.njk` を使います。

## ローカルで確認する

```bash
npm install
npx @11ty/eleventy --serve
```

`http://localhost:8080` で確認できます。

## デプロイ

`main` ブランチに push すると GitHub Actions が自動でビルドし、GitHub Pages に公開します。
リポジトリの Settings → Pages で「GitHub Actions」をソースに設定してください。

独自ドメイン（yataki-woody-land.net）を使う場合は `src/CNAME` の内容を確認し、DNS 側で GitHub Pages 用の設定（Aレコード／CNAME）をしてください。
