import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { cls } from "~/utils";

export const usePost = routeLoader$(async ({ params, redirect }) => {
  const { slug } = params;

  // Import getPostBySlug dynamically to avoid client-side import
  const { getPostBySlug } = await import("~/utils/markdown");
  const post = getPostBySlug(slug);

  if (!post) {
    // Redirect to blog listing if post not found
    throw redirect(302, "/blog");
  }

  return post;
});

export default component$(() => {
  const post = usePost();

  // Generate share URLs
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.value.title);

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: "facebook",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: "linkedin",
    },
  ];

  return (
    <Section id="blog-detail">
      <Container size="lg">
        <div class="max-w-3xl mx-auto py-8">
          <Link
            href="/blog"
            class="inline-flex items-center text-white mb-6 underline">
            ← Späť na Blog
          </Link>

          <article>
            <header class="mb-8">
              <SectionTitle text={post.value.title} />
              <div class="flex items-center text-sm text-gray-300 mb-4">
                <span>{post.value.date}</span>
                <span class="mx-2">•</span>
                <span>{post.value.author}</span>
              </div>
            </header>

            <div
              class="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 mb-8 text-white"
              dangerouslySetInnerHTML={post.value.html}
            />

            {/* Share buttons */}
            <div class="mt-12 pt-6 border-t border-gray-700">
              <h3 class="text-xl font-semibold mb-4 text-white">
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
                      "bg-gray-700",
                      "text-gray-200",
                      "hover:bg-blue-500 hover:text-white",
                      "transition-colors duration-200",
                    )}
                    aria-label={`Share on ${link.name}`}
                    title={`Share on ${link.name}`}>
                    {link.name[0]}
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);

  return {
    title: `${post.title} | Lukáš Chylík`,
    meta: [
      {
        name: "description",
        content: post.description,
      },
      {
        name: "keywords",
        content: `blog, ${post.title}, webový vývoj, Lukáš Chylík`,
      },
    ],
  };
};
