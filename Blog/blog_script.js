// ブログデータ（仮のデータ構造）
const blogData = [
    // 上に追加していく
    { title: "名義変更の巻", date:"2026-04-01" },
    { title: "新刊解説", date:"2025-11-22" },
    { title: "日記", date:"2025-11-01" },
    { title: "社会人生活1年、サークル参加8回", date:"2025-03-30" },
    { title: "冬コミ　新刊告知", date:"2024-12-21" },
    { title: "『春怨』の補足：モブについて", date:"2024-11-18" },
    { title: "世はまさに、大個人サイト時代！", date:"2024-11-17" },
    { title: "社会人生活7ヵ月、サークル参加6回", date:"2024-11-08" },
    { title: "投稿テスト", date:"2024-11-04" },
];

const blogsPerPage = 6;
let currentPage = 1;

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizeBlogText(markdown) {
    return markdown
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/^\s{0,3}#{1,6}\s+/gm, "")
        .replace(/^\s{0,3}>\s?/gm, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/[`*_~]/g, "")
        .replace(/\r?\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function createExcerpt(markdown, maxLength = 120) {
    const plainText = normalizeBlogText(markdown);

    if (!plainText) {
        return "本文準備中です。";
    }

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return `${plainText.slice(0, maxLength).trim()}…`;
}

function getBlogTitle(blog) {
    if (typeof blog.title === "string" && blog.title.trim() !== "") {
        return blog.title.trim();
    }

    return `${blog.date}の記事`;
}

function createBlogCardHTML(blog, excerpt, hasError = false) {
    const blogPath = `Blog/source/${blog.date}/text.md`;
    const safeTitle = escapeHtml(getBlogTitle(blog));
    const safeDate = escapeHtml(blog.date);
    const safeExcerpt = escapeHtml(excerpt);
    const readMoreHtml = hasError
        ? ""
        : `<a class="blog-thumbnail__link" href="Blog/template.html?path=${blogPath}&title=${encodeURIComponent(getBlogTitle(blog))}&date=${blog.date}">続きを読む</a>`;

    return `
        <article class="blog-thumbnail">
            <div class="blog-thumbnail__meta">
                <h2 class="blog-thumbnail__title">${safeTitle}</h2>
                <p class="blog-thumbnail__date">${safeDate}</p>
            </div>
            <p class="blog-thumbnail__excerpt">${safeExcerpt}</p>
            ${readMoreHtml}
        </article>
    `;
}

// ブログリストを読み込む
function loadBlogList(page) {
    currentPage = page;

    // 表示する範囲を取得
    const startIndex = (page - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const blogsToDisplay = blogData.slice(startIndex, endIndex);

    const blogListContainer = document.getElementById("blog-list");
    blogListContainer.innerHTML = ""; // 一旦クリア

    const fetchPromises = blogsToDisplay.map(blog =>{
        const blog_path = `Blog/source/${blog.date}/text.md`;
        return fetch(blog_path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${blog_path}`);
                }

                return response.text();
            })
            .then(markdown => {
                const excerpt = createExcerpt(markdown);
                return createBlogCardHTML(blog, excerpt);
            })
            .catch(error => {
                console.error("Error loading blog:", error);
                return createBlogCardHTML(blog, "コンテンツを読み込めませんでした。", true);
            })
        });

    // Promise.all ですべての処理を待機し、順序を維持
    Promise.all(fetchPromises).then(blogHTMLs => {
        blogListContainer.innerHTML = blogHTMLs.join("");
    });

    renderPagination();
}

// ページネーションボタンの生成
function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // ページネーションのクリア

    const totalPages = Math.ceil(blogData.length / blogsPerPage);

    // 最初のボタン
    const firstPageButton = document.createElement("button");
    firstPageButton.innerHTML = "<<";
    firstPageButton.disabled = currentPage === 1;
    firstPageButton.onclick = () => loadBlogList(1);
    paginationContainer.appendChild(firstPageButton);

    // 前のボタン
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => loadBlogList(currentPage - 1);
    paginationContainer.appendChild(prevButton);

    // ページ番号ボタン
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerHTML = i;
        pageButton.classList.toggle("active", i === currentPage); // 現在のページを強調表示
        pageButton.onclick = () => loadBlogList(i);
        paginationContainer.appendChild(pageButton);
    }

    // 次のボタン
    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => loadBlogList(currentPage + 1);
    paginationContainer.appendChild(nextButton);

    // 最後のボタン
    const lastPageButton = document.createElement("button");
    lastPageButton.innerHTML = ">>";
    lastPageButton.disabled = currentPage === totalPages;
    lastPageButton.onclick = () => loadBlogList(totalPages);
    paginationContainer.appendChild(lastPageButton);
}



// Markdownファイルを読み込んでHTMLに変換し、指定の要素に挿入する関数
async function loadMarkdown(markdownPath) {
    try {
        //getElementByIdで出力先を指定
    let exportMarkdown = document.getElementById("blog-text");
    const response = await fetch(markdownPath, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to load ${markdownPath}`);
    }

    const text = await response.text();
    exportMarkdown.innerHTML = marked.parse(text);
    // Markdownの読み込みが完了した後に共有リンクを生成
    generateShareLinks();
    } catch (error) {
        console.error("Markdownファイルの読み込みに失敗しました:", error);
        document.getElementById("blog-text").innerHTML = "<p>コンテンツを読み込めませんでした。</p>";
    }
}


function generateShareLinks() {
    const blogTitleElement = document.getElementById("blog-title");
    const twitterShareLink = document.getElementById("twitter-share");
    const blueskyShareLink = document.getElementById("bluesky-share");

    if (blogTitleElement && twitterShareLink) {
        // ブログのタイトルを取得
        const blogTitle = encodeURIComponent(blogTitleElement.textContent);
        const currentUrl = encodeURIComponent(window.location.href);

        // Twitterの共有リンク
        if (twitterShareLink) {
            twitterShareLink.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${blogTitle}：End of My Lilithのブログ`;
        }
        // Blueskyの共有リンク
        if (blueskyShareLink) {
            blueskyShareLink.href = `https://bsky.app/intent/compose?text=${blogTitle}：End of My Lilithのブログ%0a${currentUrl}`;
        }
    }
};
