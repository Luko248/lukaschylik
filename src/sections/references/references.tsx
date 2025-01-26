import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";

const References = component$(() => {
  return (
    <Section id="references">
      <Container size="full">
        <div class="grid grid-cols-1 lg:grid-cols-[8fr_5fr] gap-section-inline isolate">
          <div>
            <SectionTitle text="Referencie" />
            <div class="content-fade-in">
              <p class="text-xl leading-relaxed font-light mb-2 text-white">
                Mám rozsiahle skúsenosti s frontend vývojom a počas rokov som
                spolupracoval s rôznymi spoločnosťami a organizáciami.
              </p>
              <p class="text-xl leading-relaxed font-light mb-2 text-white">
                Od roku 2016 som sa venoval tvorbe webových stránok pre klientov
                ako Elendris alebo Anew Style.
              </p>
              <p class="text-xl leading-relaxed font-light mb-2 text-white">
                Mal som dlhodobú spoluprácu s Riganti, kde som prispieval k
                rôznym webovým projektom. Pre Update Conference som vytvoril
                množstvo webových stránok a pomohol vyvinúť UI kit pre DotVVM
                framework. Už nespolupracujem s Riganti.
              </p>
              <p class="text-xl leading-relaxed font-light text-white">
                Momentálne pracujem pre AIS Servis, kde vyvíjam dizajnový systém
                pre VIG Česká republika.
              </p>
            </div>
          </div>
          <ul class="ref-list list-none p-0 m-0 content-fade-in">
            <Reference
              title="AIS servis"
              webURL="https://www.ais=servis.cz/"
              website="ais=servis.cz"
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
              title="Update Conference"
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
