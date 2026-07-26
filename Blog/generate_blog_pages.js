const fs = require("fs");
const path = require("path");
const blogData = require("./blog_data.js");

const projectRoot = path.resolve(__dirname, "..");
const templatePath = path.join(__dirname, "article_template.html");
const outputDirectory = path.join(__dirname, "articles");
const siteUrl = "https://rusnrg1.github.io/End-of-My-Lilith";
const defaultImagePath = "images/meta.png";

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function toSiteUrl(relativePath) {
    return `${siteUrl}/${relativePath.replace(/^\/+/, "")}`;
}

function assertLocalFile(relativePath, label) {
    const localPath = path.resolve(projectRoot, relativePath);
    const relativeToRoot = path.relative(projectRoot, localPath);

    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
        throw new Error(`${label}のパスがサイト外を指してるよ: ${relativePath}`);
    }

    if (!fs.existsSync(localPath)) {
        throw new Error(`${label}が見つからないよ: ${relativePath}`);
    }
}

function replaceAll(template, replacements) {
    return Object.entries(replacements).reduce(
        (html, [token, value]) => html.split(`{{${token}}}`).join(value),
        template,
    );
}

function generateBlogPages() {
    const template = fs.readFileSync(templatePath, "utf8");
    fs.mkdirSync(outputDirectory, { recursive: true });

    for (const blog of blogData) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(blog.date)) {
            throw new Error(`日付はYYYY-MM-DDで書いてね: ${blog.date}`);
        }

        const title = String(blog.title || "").trim() || `${blog.date}の記事`;
        const markdownPath = `Blog/source/${blog.date}/text.md`;
        const socialImagePath = String(blog.image || "").trim() || defaultImagePath;
        const articlePath = `Blog/articles/${blog.date}.html`;

        assertLocalFile(markdownPath, "記事本文");
        assertLocalFile(socialImagePath, "サムネイル画像");

        const html = replaceAll(template, {
            BLOG_TITLE: escapeHtml(title),
            BLOG_DATE: escapeHtml(blog.date),
            MARKDOWN_PATH: escapeHtml(markdownPath),
            SOCIAL_IMAGE_URL: escapeHtml(toSiteUrl(socialImagePath)),
            ARTICLE_URL: escapeHtml(toSiteUrl(articlePath)),
        });
        const outputPath = path.join(outputDirectory, `${blog.date}.html`);

        fs.writeFileSync(outputPath, html, "utf8");
        console.log(`生成できたよ〜: ${path.relative(projectRoot, outputPath)}`);
    }
}

generateBlogPages();