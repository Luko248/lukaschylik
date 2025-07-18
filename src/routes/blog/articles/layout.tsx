import { component$, Slot } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import { Icon } from "~/components";
import { BlogProgress } from "~/components/blog/BlogProgress";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import { getAllPosts } from "~/utils/markdown.server";
import "~/styles/css/prism.css";

/**
 * Route loader to fetch the current blog post data based on the URL slug
 * Follows Qwik's pattern for efficient data loading and resumability
 * @returns {BlogPost | null} The current blog post data or null if not found
 */
export const useCurrentPost = routeLoader$(async ({ status, url }) => {
  try {
    const urlParts = url.pathname.split("/");
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

    if (!slug || slug === "articles") {
      return null;
    }

    const allPosts = getAllPosts();
    const post = allPosts.find((post) => post.slug === slug);

    if (!post) {
      status(404);
      return null;
    }

    return post;
  } catch {
    status(500);
    return null;
  }
});

/**
 * Universal blog detail layout that wraps all blog article content
 * This component serves as a parent layout for all blog posts,
 * providing consistent styling, structure, and functionality like
 * the scroll progress indicator and social sharing buttons.
 * @returns {JSX.Element} The blog layout component with nested content
 */
export default component$(() => {
  const post = useCurrentPost();

  return (
    <Section id="blog-detail" className=" dark:bg-black-800">
      <BlogProgress />
      <Container size="blog">
        <Link
          href="/blog"
          class="inline-flex items-center text-gray-800 dark:text-gray-300 mb-6 underline">
          ← Späť na zoznam článkov
        </Link>

        <article class="blog dark:bg-gray-900 bg-gray-100">
          {post.value && (
            <header class="mb-8">
              <h1 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-gray-800 dark:text-gray-300 leading-tight md:leading-tight lg:leading-tight">
                {post.value.title}
                <small class="mt-2 block">{post.value.subtitle}</small>
              </h1>
              <div class="flex items-center justify-between gap-2">
                <div class="flex gap-2 items-center text-sm text-gray-800 dark:text-gray-300">
                  <time
                    dateTime={post.value.date}
                    class="text-gray-800 dark:text-gray-300">
                    {new Date(post.value.date).toLocaleDateString("cs-CZ")}
                  </time>
                  <span class="text-yellow-500 text-2xl">•</span>
                  <span>{post.value.author}</span>
                </div>
                {post.value.podcastUrl && (
                  <a
                    class="podcast-link grid place-items-center ratio-1/1 border-0 text-black dark:text-white bg-transparent hover:text-[#1DB954] transition-colors duration-200 rounded-full"
                    href={post.value.podcastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Prehrať Podcast na Spotify">
                    <Icon name="spotify" size="2.5rem" />
                  </a>
                )}
              </div>
            </header>
          )}
          <Slot />
        </article>
      </Container>
    </Section>
  );
});

/**
 * Dynamic head metadata for blog posts
 * Falls back to default values if frontmatter data is missing
 * @param {Object} props - The head props object containing metadata from MDX frontmatter
 * @returns {DocumentHead} The document head metadata for the blog post
 */
export const head: DocumentHead = ({ head, resolveValue }) => {
  const post = resolveValue(useCurrentPost);

  return {
    title: `${post?.title} | Blog | Lukáš Chylík`,
    meta: [
      {
        name: "description",
        content: post?.description,
      },
    ],
  };
};
