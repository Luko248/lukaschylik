import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { BlogCard } from "~/components/blog-card";
import { getAllPosts } from "~/utils/markdown.server";
import { cls } from "~/utils";
import Icon from "~/components/icon/icon";

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
        post.subtitle.toLowerCase().includes(query)
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
            "dark:from-black dark:from-65% dark:to-transparent isolation-auto z-10"
          )}
        >
          <input
            type="search"
            placeholder="Vyhľadať článok..."
            class={cls(
              "w-full px-4 py-3 text-lg",
              "border border-box border-gray-300 dark:border-gray-400",
              "rounded-lg",
              "text-black dark:text-white",
              "placeholder-gray-500 dark:placeholder-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            )}
            value={searchQuery.value}
            onInput$={(_, el) => {
              searchQuery.value = el.value;
            }}
          />
        </div>

        <div
          class={cls(
            "grid gap-6 md:gap-8",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            "grid-rows-[repeat(auto-fill,auto_1fr_auto)]"
          )}
        >
          {filteredPosts.value.length > 0 ? (
            filteredPosts.value.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))
          ) : (
            <div
              class={cls(
                "col-span-full",
                "flex flex-col items-center justify-center",
                "gap-4 md:gap-6",
                "text-center text-xl",
                "text-gray-800 dark:text-gray-300",
                "py-16"
              )}
            >
              <Icon
                name="sad-face"
                cls="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
              />
              <div>
                {searchQuery.value.trim()
                  ? "Žiadne články sa nenašli."
                  : "Žiadne články zatiaľ nie sú k dispozícii."}
              </div>
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
