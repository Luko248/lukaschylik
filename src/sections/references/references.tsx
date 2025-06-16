import { component$ } from "@builder.io/qwik";
import { Button } from "~/components";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";

const References = component$(() => {
  return (
    <Section id="references">
      <Container size="full">
        <div class="relative grid grid-cols-1 xl:grid-cols-[8fr_5fr] gap-5 isolate xl:max-h-screen xl:overflow-auto">
          <div class="relative xl:sticky xl:top-0 xl:h-fit mb-8 xl:mb:0">
            <SectionTitle text="Referencie" />
            <div class="content-fade-in">
              <p class="text-l lg:text-xl leading-relaxed font-light mb-4 md:mb-8 text-gray-300 font-mono">
                Od roku 2016 som sa venoval tvorbe webových stránok pre klientov
                ako Elendris alebo Anew Style.
              </p>
              <p class="text-l lg:text-xl leading-relaxed font-light mb-4 md:mb-8 text-gray-300 font-mono">
                Mal som dlhodobú spoluprácu s Riganti, kde som prispieval k
                rôznym webovým projektom. Pre Update Conference som vytvoril
                množstvo webových stránok a pomohol vyvinúť UI kit pre DotVVM
                framework. Už nespolupracujem s Riganti.
              </p>

              <p class="text-l lg:text-xl leading-relaxed font-light mb-8 md:mb-16 text-gray-300 font-mono">
                Okrem vývoja sa venujem aj prednášaniu na rôznych meetupoch a
                konferenciách.
              </p>
              <Button
                variant="secondary"
                ariaLabel="Služby a spoupráca"
                title="Služby a spoupráca"
                href="#contact">
                Služby a spoupráca
              </Button>
              <div class="video-carousel relative flex flex-row gap-4 mt-10 md:mt-20 snap-x snap-mandatory max-w-full md:max-w-[560px] overflow-clip overflow-x-auto scroll-smooth">
                <iframe
                  class="snap-center min-w-full aspect-video block"
                  loading="lazy"
                  width="560"
                  src="https://www.youtube.com/embed/hwhuSdO5fU0?si=ZckQ-cJlCGZpJExv"
                  title="YouTube video Lukáš Chylík - Frontendové novinky"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullscreen></iframe>
                <iframe
                  class="snap-center min-w-full aspect-video block"
                  loading="lazy"
                  width="560"
                  src="https://www.youtube.com/embed/p8sQyt4YFdk?si=WDxTC4029EeFecKk"
                  title="YouTube video Lukáš Chylík - Pozicování pomocí CSS anchor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullscreen></iframe>
              </div>
            </div>
          </div>
          <ul class="ref-list list-none p-0 m-0 content-fade-in xl:mt-5 3xl:mt-8">
            <Reference
              title="AIS servis"
              webURL="https://www.ais-servis.cz/"
              website="ais-servis.cz"
              type="Spolupráca"
            />
            <Reference
              title="Elendris"
              webURL="https://elendris.cz/en/"
              website="elendris.cz"
              type="Web"
            />
            <Reference
              title="Anew style"
              webURL="https://anewstyle.cz/"
              website="anewstyle.cz"
              type="Web"
            />
            <Reference
              title="thelucie.ink"
              webURL="https://thelucie.ink/"
              website="thelucie.ink"
              type="Web"
            />
            <Reference
              title="IVPA bau"
              webURL="https://ivpabau.de/"
              website="ivpabau.de"
              type="Web"
            />
            <Reference
              title="Riganti"
              webURL="https://www.riganti.cz/"
              website="riganti.cz"
              type="Spolupráca"
            />
            <Reference
              title="Update"
              webURL="https://www.updateconference.net/"
              website="updateconference.net"
              type="Spolupráca"
            />
            <Reference
              title="DotVVM"
              webURL="https://www.dotvvm.com/"
              website="dotvvm.com"
              type="Spolupráca"
            />
            <Reference
              title="Krossbau s.r.o."
              webURL="https://www.krossbau.cz/"
              website="krossbau.cz"
              type="Web"
            />
            <Reference
              title="IVPA Okná"
              webURL="https://ivpaokna.sk/"
              website="ivpaokna.sk"
              type="Web"
            />
            <Reference
              title="Brand Design"
              webURL="https://brand-design.cz/"
              website="brand-design.cz"
              type="Web"
            />
            <Reference
              title="Filtre na mlieko"
              webURL="https://filtrenamlieko.sk/"
              website="filtrenamlieko.sk"
              type="Web"
            />
          </ul>
        </div>
      </Container>
    </Section>
  );
});

export default References;
