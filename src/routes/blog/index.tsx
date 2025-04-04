import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import Card from "~/components/card/card";

// Server-side loader to get blog posts
export const useBlogPosts = routeLoader$(async () => {
  // Import getAllPosts dynamically to avoid client-side import
  const { getAllPosts } = await import("~/utils/markdown");
  const posts = getAllPosts();
  return posts;
});

export default component$(() => {
  const posts = useBlogPosts();

  return (
    <Section id="blog">
      <Container size="lg">
        <SectionTitle text="Blog" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {posts.value.length > 0 ? (
            posts.value.map((post) => (
              <Card
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                author={post.author}
                path={`/blog/${post.slug}`}
                isBlogPost={true}
              />
            ))
          ) : (
            <div class="col-span-full text-center text-xl text-white">
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
      content: "Prečítajte si moje najnovšie články o webovom vývoji, dizajne a technológiách.",
    },
    {
      name: "keywords",
      content: "blog, webový vývoj, dizajn, technológie, Lukáš Chylík",
    },
  ],
};
