import { component$ } from "@builder.io/qwik";
import { Card } from "~/components";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { classNames } from "~/utils";

const References = component$(() => {
  return (
    <Section id="services">
      <Container size="full">
        <SectionTitle text="Služby" />
        <div class="content-fade-in">
          <p class="text-l lg:text-xl leading-relaxed font-light mb-18 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic
            blanditiis quidem dolore excepturi ipsam temporibus, eius dolorum!
            Quis, facere?
          </p>
        </div>
        <div
          class={classNames(
            "grid",
            "grid-cols-1 lg:grid-cols-3",
            "grid-rows-[auto_1fr_auto]",
            "gap-x-12 md:gap-x-18",
            "content-fade-in content-fade-in--entry",
          )}>
          <Card title="Konzultácie" price={1800}>
            <p>
              Ponúkam konzultácie zamerané na frontend technológie pre firmy aj
              jednotlivcov., konzultácia za 1800 Kč/h,.
            </p>
            <ul>
              <li class="marker:content-[🔥]">Úvodná schôdzka zdarma</li>
              <li>Online alebo osobne</li>
            </ul>
          </Card>
          <Card title="Mentoring" price={1000}>
            <p>
              Poskytujem mentoring online aj individuálne. Pomôžem vám zvládnuť
              frontend technológie a zlepšiť vaše zručnosti.
            </p>
          </Card>
          <Card title="Workshopy" price={25000}>
            <p>
              Organizujem workshopy pre spoločnosti zamerané na voľbu
              technologického stacku. Pomôžem vám vybrať správne technológie a
              knižnice pre váš projekt.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
});

export default References;
