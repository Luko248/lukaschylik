import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  html: string;
}

// This function should only be used on the server
export const getAllPosts = () => {
  const articlesDirectory = path.join(process.cwd(), "public/articles");
  
  // Get all markdown files from the articles directory
  const fileNames = fs.readdirSync(articlesDirectory);

  // Parse each markdown file and get the metadata and content
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(articlesDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Convert markdown to HTML
      const html = marked(content);

      // Combine the data with the slug
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date.toISOString().split("T")[0],
        author: data.author,
        content,
        html,
      } as BlogPost;
    })
    // Sort posts by date
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPostsData;
};

// This function should only be used on the server
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  try {
    const articlesDirectory = path.join(process.cwd(), "public/articles");
    
    // Find the markdown file that matches the slug
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const html = marked(content);

    // Return the post data
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date.toISOString().split("T")[0],
      author: data.author,
      content,
      html,
    } as BlogPost;
  } catch (error) {
    return undefined;
  }
};
