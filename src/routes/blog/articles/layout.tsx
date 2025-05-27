import { component$ } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";
import {
  DocumentHead,
  useLocation,
  Link,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getAllPosts } from "~/utils/markdown.server";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import { cls } from "~/utils";
import { Button, Icon } from "~/components";

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
  } catch (error) {
    status(500);
    return null;
  }
});

/**
 * Interface for social share links
 * @property {string} name - The name of the social media platform
 * @property {string} url - The sharing URL with placeholders for content
 * @property {string} icon - The icon name to display for the sharing button
 */
interface ShareLink {
  name: string;
  url: string;
  icon: string;
}

/**
 * Universal blog detail layout that wraps all blog article content
 * This component serves as a parent layout for all blog posts,
 * providing consistent styling, structure, and functionality like
 * the scroll progress indicator and social sharing buttons.
 * @returns {JSX.Element} The blog layout component with nested content
 */
export default component$(() => {
  const location = useLocation();
  const post = useCurrentPost();

  const getAbsoluteUrl = () => {
    if (typeof window === "undefined") return "";

    const canonicalElement = document.querySelector("link[rel=canonical]");
    if (canonicalElement) {
      return canonicalElement.getAttribute("href") || "";
    }

    return window.location.href;
  };

  const shareUrl = getAbsoluteUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const postTitle = post.value?.title || "Blog post";
  const encodedTitle = encodeURIComponent(postTitle);

  const shareLinks: ShareLink[] = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
      icon: "facebook",
    },
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "x",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "linkedin",
    },
  ];

  return (
    <Section id="blog-detail" className="bg-black-800">
      <div class="blog__progress" />
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
                    class="w-10 h-10 grid place-items-center ratio-1/1 border-0 text-black bg-white hover:bg-yellow-500  transition-colors duration-200"
                    href={post.value.podcastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Prehrať Podcast"
                    title="Prehrať Podcast">
                    <Icon name="podcast" size="1.8rem" />
                  </a>
                )}
              </div>
            </header>
          )}
          <Slot />
        </article>
        <div class="mt-12 pt-6 border-t border-gray-700">
          <h3 class="text-xl font-semibold mb-4 text-gray-200">
            Zdieľať článok
          </h3>
          <div class="flex gap-4">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class={cls(
                  "inline-flex items-center justify-center",
                  "w-10 h-10 rounded-full",
                  "bg-gray-200",
                  "text-black",
                  "scale-100 hover:scale-105",
                  "transition-all duration-200 scale",
                )}
                aria-label={`Share on ${link.name}`}
                title={`Share on ${link.name}`}>
                <Icon
                  name={link.icon}
                  color="black"
                  size={link.icon === "x" ? "1rem" : "1.125rem"}
                />
              </a>
            ))}
          </div>
        </div>
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
