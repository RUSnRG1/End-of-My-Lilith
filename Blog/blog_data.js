// 記事はここへ追加してね。imageは省略すると共通サムネになるよ〜。
const blogData = [
    {
        title: "テスト",
        date: "2026-07-26",
        image: "Blog/source/2026-07-26/1.jpg",
    },
    { title: "Vernalagniaの解説", date: "2026-06-13" },
    { title: "名義変更の巻", date: "2026-04-01" },
    { title: "新刊解説", date: "2025-11-22" },
    { title: "日記", date: "2025-11-01" },
    { title: "社会人生活1年、サークル参加8回", date: "2025-03-30" },
    { title: "冬コミ　新刊告知", date: "2024-12-21" },
    { title: "『春怨』の補足：モブについて", date: "2024-11-18" },
    { title: "世はまさに、大個人サイト時代！", date: "2024-11-17" },
    { title: "社会人生活7ヵ月、サークル参加6回", date: "2024-11-08" },
    { title: "投稿テスト", date: "2024-11-04" },
];

// Node.jsの生成スクリプトからも同じデータを使えるようにしてるよ。
if (typeof module !== "undefined" && module.exports) {
    module.exports = blogData;
}