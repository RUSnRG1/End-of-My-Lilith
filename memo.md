# Blog投稿方法

1. 投稿日時のフォルダをsource内に作る
2. この中にtext.mdファイルを作る
3. text.mdにブログを書く
   1. この際、タイトルはscript.jsの方に記載するため、いきなり本文からスタートさせる
   2. 画像を挿入する場合は(/Blog/source/2024-11-04/6.jpg)という風に絶対パスで記載し、text.mdと同じフォルダに入れる
4. script.jsにタイトルとtext.mdのパスを載せる。
5. 以上！

# Blogの読み込みについてのメモ
構造として
- blog_script.js内にブログの情報とパスを記載する
- ブログの一覧画面で、上記データをもとに画面を生成する。
  - この際、「続きを読む」URLにパラメータとして、全情報を載せる
- 各ブログの本文ページでは、URLに記載されたパラメータから、タイトルや日付を生成する
  - つまり個別のブログページでは、js内のconst blogDataを参照していない！


## TODO
