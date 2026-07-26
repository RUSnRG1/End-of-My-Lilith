# Blog記事の追加方法

記事追加はこの順でやればオッケーだよ〜。

1. `Blog/source/YYYY-MM-DD/text.md` を作る。
2. 専用サムネを使うなら、同じフォルダなどへ画像を置く。
3. `Blog/blog_data.js` の一番上へ記事情報を追加する。
4. `node Blog/generate_blog_pages.js` を実行する。
5. 生成された `Blog/articles/YYYY-MM-DD.html` も一緒に公開する。

## 専用サムネを指定する記事

画像パスは、サイトルートからの相対パスで `image` に書いてね。

```js
{
    title: "テスト",
    date: "2026-07-26",
    image: "Blog/source/2026-07-26/1.jpg",
},
```

## 共通サムネを使う記事

`image` を書かなければ、今まで通り `images/meta.png` が使われるよ。

```js
{
    title: "Vernalagniaの解説",
    date: "2026-06-13",
},
```

## SNSカードの説明文

XとBluesky向けの説明文には、記事タイトルと同じ文言が入るよ。

生成時に本文や画像が見つからなければエラーになるから、パス間違いにも気づきやすくしてある！