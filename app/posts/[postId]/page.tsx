import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getSortedPostsData(); // Deduped

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}) {
  try {
    const posts = getSortedPostsData(); // Deduped
    const { postId } = params;
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      return {
        title: "Post not Found",
      };
    }

    return {
      title: post.title,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

export default async function Post({ params }: { params: { postId: string } }) {
  try {
    const posts = getSortedPostsData(); // Deduped
    const { postId } = params;

    if (!posts.find((post) => post.id === postId)) {
      return notFound();
    }

    const { title, date, contentHtml } = await getPostData(postId);

    const pubDate = getFormattedDate(date);

    return (
      <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto ">
        <h1 className="text-3xl mt-4 mb-0">{title}</h1>
        <p className="mt-0">{pubDate}</p>
        <article>
          <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <p>
            <Link href="/"> --Back to home </Link>
          </p>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error fetching post data:", error);
    return <div>Error fetching post data.</div>;
  }
}
