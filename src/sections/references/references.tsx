import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import Section from "~/components/section/section";

const References = component$(() => {
  return (
    <Section id="references">
      <Container size="full">
        <div class="grid grid-cols-[8fr_5fr] gap-section-inline isolate">
          <div>
            <h2 class="text-[clamp(3rem,14svb,10rem)] mb-80 font-extrabold uppercase leading-none text-black tracking-widest relative color-transparent content-fade-in">
              references
            </h2>
            <p class="text-xl leading-relaxed font-light mb-32 text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
              voluptate quibusdam ab{" "}
              <strong class="text-black bg-yellow font-medium">
                accusantium
              </strong>{" "}
              reiciendis corporis nemo odio sapiente qui molestiae delectus
              animi et sed voluptas aliquam neque, natus quas ducimus.
            </p>
            <p class="text-xl leading-relaxed font-light text-white">
              Lorem ipsum dolor sit amet{" "}
              <strong class="text-black bg-yellow font-medium">
                consectetur
              </strong>
              , adipisicing elit. Esse explicabo facilis, provident voluptatem
              quam corporis nobis tempora.
            </p>
          </div>
          <ul class="ref-list list-none p-0 m-0">
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Elendris"
              webURL="https://elendris.cz/en/"
              website="elendris.cz"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Anew style"
              webURL="https://anewstyle.cz/"
              website="anewstyle.cz"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="thelucie.ink"
              webURL="https://thelucie.ink/"
              website="thelucie.ink"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="IVPA bau"
              webURL="https://ivpabau.de/"
              website="ivpabau.de"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Riganti"
              webURL="https://www.riganti.cz/"
              website="riganti.cz"
              type="Cooperation"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Update Conference"
              webURL="https://www.updateconference.net/"
              website="updateconference.net"
              type="Cooperation"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="DotVVM"
              webURL="https://www.dotvvm.com/"
              website="dotvvm.com"
              type="Cooperation"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Krossbau s.r.o."
              webURL="https://www.krossbau.cz/"
              website="krossbau.cz"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="IVPA Okná"
              webURL="https://ivpaokna.sk/"
              website="ivpaokna.sk"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Brand Design"
              webURL="https://brand-design.cz/"
              website="brand-design.cz"
              type="Website"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Filtre na mlieko"
              webURL="https://filtrenamlieko.sk/"
              website="filtrenamlieko.sk"
              type="Website"
            />
          </ul>
        </div>
      </Container>
    </Section>
  );
});

export default References;
