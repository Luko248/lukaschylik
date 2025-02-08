import { component$ } from "@builder.io/qwik";
import { Container, Section, Skills } from "~/components";
import SectionTitle from "~/components/section/section.title";

const About = component$(() => {
  return (
    <>
      <Section id="about-me" className="content-center">
        <Container size="full" className="relative z-10 isolate text-left">
          <div class="grid grid-cols-1 lg:grid-cols-[5fr_8fr] gap-[10svi] items-center">
            <div class="content-fade-in">
              <SectionTitle text=" Niečo o mne" />
              <p class="text-xl leading-relaxed font-light mb-8  text-white">
                Som frontend developer špecializujúci sa na{" "}
                <strong class="text-black bg-secondary font-medium ">
                  vizuálnu logiku
                </strong>
                . S 8 rokmi skúseností a množstvom projektov za sebou som
                pracoval na všetkom od prezentačných webových stránok po webové
                aplikácie, PWA a komplexné informačné systémy. Tieto skúsenosti
                mi poskytli široké pochopenie{" "}
                <strong class="text-black bg-secondary font-medium">
                  UI-UX dizajnu, webovej prístupnosti, výkonu a SEO
                </strong>
                . Momentálne sa zameriavam na implementáciu dizajnových
                systémov.
              </p>
              <p class="text-xl leading-relaxed ont-light mb-8 text-white">
                Tiež pomáham vývojárom pri výbere správnej technológie pre
                vizuálne aspekty ich projektov a ponúkam{" "}
                <strong class="text-black bg-secondary font-medium">
                  konzultácie, workshopy a školenia
                </strong>{" "}
                v tejto oblasti.
              </p>
            </div>
            <div>
              <img
                class="me relative z-0 opacity-0 block mx-auto"
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
