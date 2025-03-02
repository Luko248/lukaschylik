import { component$ } from "@builder.io/qwik";
import { Card, ListItem } from "~/components";
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
            Zistenie, že ste pre váš projekt zvolili{" "}
            <strong>nesprávne technológie</strong> v pokročilom štádiu vývoja,{" "}
            <strong> vždy zabolí</strong>. Takémuto problému a mnohým ďalším Vám
            pomôžem predísť. Ušetríte <strong>čas</strong>,{" "}
            <strong>peniaze</strong>, a ako bonus budete mať Vy aj váš tím
            kľudný spánok.
          </p>
        </div>
        <div
          class={classNames(
            "grid",
            "grid-cols-1 lg:grid-cols-3",
            "grid-rows-[auto_auto_1fr_auto]",
            "gap-x-12 md:gap-x-18",
            "content-fade-in content-fade-in--entry",
          )}>
          <Card title="Konzultácie" price={2000}>
            <p>
              Potrebujete poradiť?
              <br />
              Trápi Vas implementačný problém, vizuálny bug alebo{" "}
              <strong>optimalizácia webového výkonu?</strong>
              <br />
              Som tu pre Vás.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem>Úvodná schôdzka ZDARMA!</ListItem>
              <ListItem>Pre firmy aj jednotlivcov</ListItem>
              <ListItem>Online alebo osobne</ListItem>
              <ListItem marker="☝🏽">Minimálne 1 hodina</ListItem>
            </ul>
          </Card>
          <Card title="Mentoring" price={1500}>
            <p>
              Rozhodujete sa, ktorý <strong>frontend tech stack</strong> je pre
              Vás projekt vhodný? Alebo si len chcete rozšíriť{" "}
              <strong>svoje vedomosti</strong> ? Poradím Vám, ako minimalizovať
              náklady a maximalizovať efektivitu Vášho biznisu výberom vhodnej
              technológie.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem>Prvá hodina konzultácie ZDARMA!</ListItem>
              <ListItem>Pre firmy aj jednotlivcov</ListItem>
              <ListItem>Online alebo osobne</ListItem>
              <ListItem marker="☝🏽">Minimálne 1 MD</ListItem>
            </ul>
          </Card>
          <Card title="Školenia">
            <p>
              JavasScript je skvelá technológia, no používať ju v dnešnej dobe
              na všetko, je nezmysel.
              <br />
              Ponúkam
              <strong> školenia a workshopy</strong> zamerané na implementáciu
              <strong> vizuálnej logiky</strong> a
              <strong> design systémov</strong> pomocou moderného CSS.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem>Úvodná schôdzka ZDARMA!</ListItem>
              <ListItem>
                Při objednání viacerich termínu školení 10% zľava
              </ListItem>
              <ListItem>Pre firmy aj jednotlivcov</ListItem>
              <ListItem marker="☝🏽">len osobne</ListItem>
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
});

export default References;
