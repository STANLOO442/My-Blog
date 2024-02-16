import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define the BlogPost type if not already defined
interface BlogPost {
  id: string;
  title: string;
  date: string;
}

const postsDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  try {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
      // Remove .md from file name to get id
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post's metadata section
      const matterResult = matter(fileContents);

      const blogPost: BlogPost = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
      };

      // Combine the data with the id
      return blogPost;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Error in getSortedPostsData:", error);
    return [];
  }
}

export async function getPostData(id: string) {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post's metadata section
    const matterResult = matter(fileContents);

    // Process content with remark and remark-html
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      contentHtml,
    };

    return blogPostWithHTML;
  } catch (error) {
    console.error("Error in getPostData:", error);
    return null;
  }
}
