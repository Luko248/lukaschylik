import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string; // Raw Markdown content
}

// Path to the articles subfolder where all blog posts are now stored
const postsDirectory = path.join(process.cwd(), "src", "routes", "blog", "articles");

// This function should only be used on the server/build time
/**
 * Get all blog posts from the articles directory
 * @returns {BlogPost[]} Array of blog posts sorted by date (newest first)
 */
export const getAllPosts = (): BlogPost[] => {
  try {
    // Get all directories in the articles folder (each directory is a blog post)
    const slugs = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const allPostsData = slugs
      .map((slug) => {
        let fullPath = path.join(postsDirectory, slug, "index.mdx");
        if (!fs.existsSync(fullPath)) {
          fullPath = path.join(postsDirectory, slug, "index.md");
          if (!fs.existsSync(fullPath)) {
            return null;
          }
        }
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          description: data.description,
          date:
            data.date instanceof Date
              ? data.date.toISOString().split("T")[0]
              : data.date,
          author: data.author,
          content,
        } as BlogPost;
      })
      .filter((post) => post !== null) as BlogPost[];

    return allPostsData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
};
