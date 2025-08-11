import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { getAllPosts } from "~/utils/markdown.server";
import { cls } from "~/utils";

export const useBlogPosts = routeLoader$(async () => {
  const posts = getAllPosts();
  return posts;
});

export default component$(() => {
  const posts = useBlogPosts();
  const searchQuery = useSignal("");

  /**
   * Filters blog posts based on search query.
   * Searches through post titles and subtitles (case-insensitive).
   * Returns all posts if search query is empty.
   *
   * @returns Filtered array of blog posts matching the search criteria
   */
  const filteredPosts = useComputed$(() => {
    if (!searchQuery.value.trim()) {
      return posts.value;
    }

    const query = searchQuery.value.toLowerCase();
    return posts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query),
    );
  });

  return (
    <Section id="blog" centerContent={false}>
      <Container size="sm">
        <SectionTitle text="Blog" />
        <div
          class={cls(
            "sticky pb-8 md:pb-12",
            "top-[var(--nav_height)]",
            "bg-gradient-to-b from-white from-65% to-transparent",
            "dark:from-black dark:from-65% dark:to-transparent isolation-auto z-10",
          )}>
          <input
            type="search"
            placeholder="Vyhľadať článok..."
            class={cls(
              "w-full px-4 py-3 text-lg",
              "border border-box border-gray-300 dark:border-gray-400",
              "rounded-lg",
              "text-black dark:text-white",
              "placeholder-gray-500 dark:placeholder-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent",
            )}
            value={searchQuery.value}
            onInput$={(e) => {
              searchQuery.value = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="grid">
          {filteredPosts.value.length > 0 ? (
            filteredPosts.value.map((post) => (
              <>
                <Link
                  key={post.slug}
                  href={`/blog/articles/${post.slug}`}
                  class={cls("text-black dark:text-white", "group")}>
                  <strong
                    class={cls(
                      "text-2xl sm:text-4xl md:text-6xl",
                      "block mb-1 md:mb-2",
                      "group-hover:text-yellow-500",
                      "transition-colors duration-200",
                    )}>
                    {post.title}
                  </strong>
                  <small
                    class={cls(
                      "block",
                      "text-gray-800 dark:text-gray-300",
                      "text-l sm:text-2xl md:text-3xl",
                    )}>
                    {post.subtitle}
                  </small>
                  <p class={cls("block", "text-l md:text-xl", "my-4 md:my-8")}>
                    {post.description}
                  </p>
                  <div
                    class={cls(
                      "flex gap-2 items-center",
                      "text-sm",
                      "text-gray-800 dark:text-gray-300",
                    )}>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("cs-CZ")}
                    </time>
                    <span class={cls("text-yellow-500", "text-2xl")}>•</span>
                    <span>{post.author}</span>
                  </div>
                </Link>
                <hr
                  class={cls(
                    "border-black/20 dark:border-white/20",
                    "my-4 md:my-8",
                  )}
                />
              </>
            ))
          ) : (
            <div
              class={cls(
                "col-span-full",
                "text-center text-xl",
                "text-gray-800 dark:text-gray-300",
              )}>
              {searchQuery.value.trim()
                ? "Žiadne články sa nenašli."
                : "Žiadne články zatiaľ nie sú k dispozícii."}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
});

export const head: DocumentHead = {
  title: "Blog | Lukáš Chylík",
  meta: [
    {
      name: "description",
      content:
        "Prečítajte si moje najnovšie články o webovom vývoji, dizajne a technológiách.",
    },
  ],
};
