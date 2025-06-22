import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { getAllPosts } from "~/utils/markdown.server";

export const useBlogPosts = routeLoader$(async () => {
  const posts = getAllPosts();
  return posts;
});

export default component$(() => {
  const posts = useBlogPosts();

  return (
    <Section id="blog" centerContent={false}>
      <Container size="sm">
        <SectionTitle text="Blog" />
        <div class="grid">
          {posts.value.length > 0 ? (
            posts.value.map((post) => (
              <>
                <Link
                  key={post.slug}
                  href={`/blog/articles/${post.slug}`}
                  class="text-black dark:text-white group">
                  <strong class="text-2xl sm:text-4xl md:text-6xl block mb-1 md:mb-2 group-hover:text-yellow-500 transition-colors duration-200">
                    {post.title}
                  </strong>
                  <small class="block text-gray-800 dark:text-gray-300 text-l sm:text-2xl md:text-3xl">
                    {post.subtitle}
                  </small>
                  <p class="block text-l md:text-xl my-4 md:my-8">
                    {post.description}
                  </p>
                  <div class="flex gap-2 items-center text-sm text-gray-800 dark:text-gray-300">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("cs-CZ")}
                    </time>
                    <span class="text-yellow-500 text-2xl">•</span>
                    <span>{post.author}</span>
                  </div>
                </Link>
                <hr class="border-white/20 my-4 md:my-8" />
              </>
            ))
          ) : (
            <div class="col-span-full text-center text-xl text-gray-800 dark:text-gray-300">
              Žiadne články zatiaľ nie sú k dispozícii.
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
    {
      name: "keywords",
      content: "blog, webový vývoj, dizajn, technológie, Lukáš Chylík",
    },
  ],
};
