import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, Link, type DocumentHead } from "@builder.io/qwik-city";
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
    <Section id="blog-detail" className="bg-black-800">
      <BlogProgress />
      <Container size="blog" className="pt-8">
        <Link
          href="/blog"
          class="inline-flex items-center text-gray-200 mb-6 underline">
          ← Späť na zoznam článkov
        </Link>

        <article class="blog">
          {post.value && (
            <header class="mb-8">
              <h1 class="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-gray-200 leading-tight md:leading-tight lg:leading-tight">
                {post.value.title}
                <small class="mt-2 block">{post.value.subtitle}</small>
              </h1>

              <div class="flex items-center justify-between gap-2">
                <div class="flex items-start text-sm text-gray-300 mb-4">
                  <span>{post.value.date}</span>
                  <span class="mx-2">•</span>
                  <span>{post.value.author}</span>
                </div>
                {post.value.podcastUrl && (
                  <a
                    class="podcast-link grid place-items-center ratio-1/1 border-0 text-white bg-transparent hover:text-[#1DB954] transition-colors duration-200 rounded-full"
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
  const description =
    post?.description ||
    "Osobný blog o webovom vývoji, dizajne a technológiách";

  return {
    title: `${head.title} | Blog | Lukáš Chylík` || "Blog | Lukáš Chylík",
    meta: [
      ...(head.meta || []),
      {
        name: "description",
        content: description,
      },
      {
        name: "og:description",
        content: description,
      },
      {
        name: "og:type",
        content: "article",
      },
      {
        name: "keywords",
        content: `blog, webový vývoj, dizajn, technológie, Lukáš Chylík`,
      },
    ],
  };
};
