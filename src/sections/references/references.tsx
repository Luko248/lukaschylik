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
            <div class="content-fade-in">
              <p class="text-xl leading-relaxed font-light mb-32 text-white">
                I have extensive experience in front-end development and have
                collaborated with various companies and organizations over the
                years.
              </p>
              <p class="text-xl leading-relaxed font-light mb-32 text-white">
                Since 2016, I have been dedicated to creating websites for
                clients like Elendris or Anew Style.
              </p>
              <p class="text-xl leading-relaxed font-light mb-32 text-white">
                I had a long-term collaboration with Riganti, contributing to
                various web projects. For Update Conference, I created numerous
                websites and helped develop a UI kit for the DotVVM framework. I
                no longer collaborate with Riganti.
              </p>
              <p class="text-xl leading-relaxed font-light text-white">
                Currently, I work for AIS Servis, developing a design system for
                VIG Czech Republic.
              </p>
            </div>
          </div>
          <ul class="ref-list list-none p-0 m-0 content-fade-in">
            <Reference
              title="AIS servis"
              webURL="https://www.ais=servis.cz/"
              website="ais=servis.cz"
              type="Cooperation"
            />
            <Reference
              title="Elendris"
              webURL="https://elendris.cz/en/"
              website="elendris.cz"
              type="Website"
            />
            <Reference
              title="Anew style"
              webURL="https://anewstyle.cz/"
              website="anewstyle.cz"
              type="Website"
            />
            <Reference
              title="thelucie.ink"
              webURL="https://thelucie.ink/"
              website="thelucie.ink"
              type="Website"
            />
            <Reference
              title="IVPA bau"
              webURL="https://ivpabau.de/"
              website="ivpabau.de"
              type="Website"
            />
            <Reference
              title="Riganti"
              webURL="https://www.riganti.cz/"
              website="riganti.cz"
              type="Cooperation"
            />
            <Reference
              title="Update Conference"
              webURL="https://www.updateconference.net/"
              website="updateconference.net"
              type="Cooperation"
            />
            <Reference
              title="DotVVM"
              webURL="https://www.dotvvm.com/"
              website="dotvvm.com"
              type="Cooperation"
            />
            <Reference
              title="Krossbau s.r.o."
              webURL="https://www.krossbau.cz/"
              website="krossbau.cz"
              type="Website"
            />
            <Reference
              title="IVPA Okná"
              webURL="https://ivpaokna.sk/"
              website="ivpaokna.sk"
              type="Website"
            />
            <Reference
              title="Brand Design"
              webURL="https://brand-design.cz/"
              website="brand-design.cz"
              type="Website"
            />
            <Reference
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
