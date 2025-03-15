import { component$ } from "@builder.io/qwik";
import { Container, Section, Skills } from "~/components";
import SectionTitle from "~/components/section/section.title";
import { cls } from "~/utils";

const About = component$(() => {
  return (
    <>
      <Section id="about-me" className="content-center">
        <Container size="full" className="relative z-10 isolate text-left">
          <div
            class={cls(
              "grid grid-cols-1 items-start",
              "lg:grid-cols-[5fr_8fr] lg:grid-rows-[auto_1fr]",
            )}>
            <SectionTitle
              text="Niečo o mne"
              className="about-title lg:row-start-1 lg:col-span-2 lg:col-start-1"
            />
            <div class="content-fade-in">
              <p class="text-l lg:text-xl leading-relaxed font-light mb-8 text-white">
                Som frontend developer špecializujúci sa na{" "}
                <strong class="text-black bg-secondary font-medium">
                  vizuálnu logiku
                </strong>
                . S ôsmimi rokmi skúseností a množstvom projektov za sebou som
                pracoval na všetkom od prezentačných webových stránok po webové
                aplikácie, PWA a komplexné informačné systémy. Tieto skúsenosti
                mi poskytli široké pochopenie{" "}
                <strong class="text-black bg-secondary font-medium">
                  UI-UX dizajnu, webovej prístupnosti, výkonu a SEO
                </strong>
                . Momentálne sa zameriavam na implementáciu dizajnových
                systémov.
              </p>
              <p class="text-l lg:text-xl leading-relaxed font-light mb-8 text-white">
                Tiež pomáham vývojárom pri výbere správnej technológie pre
                vizuálne aspekty ich projektov a ponúkam{" "}
                <strong class="text-black bg-secondary font-medium">
                  konzultácie, workshopy a školenia
                </strong>{" "}
                v tejto oblasti.
              </p>
            </div>
            <div class="lg:row-start-1 lg:row-span-2 lg:col-start-2">
              <img
                class="me relative z-0 block mx-auto"
                src="/images/me.webp"
                alt="The picture of me"
                loading="lazy"
                width={768}
                height={768}
              />
            </div>
          </div>
        </Container>
        <Skills />
      </Section>
    </>
  );
});

export default About;
