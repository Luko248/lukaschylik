import { component$, useContext } from "@builder.io/qwik";
import { Card, ListItem } from "~/components";
import Container from "~/components/container/container";
import Section from "~/components/section/section";
import SectionTitle from "~/components/section/section.title";
import { DialogContext } from "~/utils";

const References = component$(() => {
  const dialogContext = useContext(DialogContext);

  return (
    <Section id="services">
      <Container size="full">
        <SectionTitle text="Služby" />
        <div class="content-fade-in">
          <p class="text-sm lg:text-base 3xl:text-lg leading-relaxed font-light mb-18 text-gray-800 dark:text-gray-300 font-mono">
            Zistenie, že ste pre váš projekt zvolili{" "}
            <strong>nesprávne technológie</strong> v pokročilom štádiu vývoja,{" "}
            <strong> vždy zabolí</strong>. Takémuto problému a mnohým ďalším Vám
            pomôžem predísť. Ušetríte <strong>čas</strong>,{" "}
            <strong>peniaze</strong>, a ako bonus budete mať Vy aj Váš tým
            kľudný spánok.
          </p>
        </div>
        <div class="services grid gap-8 text-white">
          <Card
            title="Konzultácie a Mentoring"
            price={1500}
            priceNote="Cena za 1 hod"
            onClick$={dialogContext.showDialog}
          >
            <p class="text-sm text-gray-800 dark:text-gray-300">
              Riešim<strong>konkrétne technické problémy</strong> a posúvam
              developerov vpred prostredníctvom{" "}
              <strong>personalizovaného mentoringu</strong>.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Riešenie konkrétnych frontend problémov
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Code review a architektonické poradenstvo
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Kariérne poradenstvo pre developerov
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm" marker="☝🏽">
                Online aj osobné stretnutia
              </ListItem>
            </ul>
          </Card>
          <Card
            title="Technologický audit"
            price={2000}
            priceNote="Cena za 1 hod"
            onClick$={dialogContext.showDialog}
          >
            <p class="text-sm text-gray-800 dark:text-gray-300">
              Analyzujem váš kód a technické riešenia, identifikujem{" "}
              <strong>slabiny</strong> a navrhujem optimalizácie
              <strong> pre lepší výkon</strong>.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Audit kódu a architektúry
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Analýza výkonu a accessibility
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Konkrétne odporúčania na zlepšenie
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm" marker="☝🏽">
                60 min. vstupné stretnutie zdarma
              </ListItem>
            </ul>
          </Card>
          <Card
            title="Workshopy a školenia"
            priceLabel="Dohodou"
            available={true}
          >
            <p class="text-sm text-gray-800 dark:text-gray-300">
              Zdieľam praktické znalosti a najnovšie trendy vo frontend
              developmente cez interaktívne workshopy pre tímy.
            </p>
            <ul class="grid gap-2 content-start">
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Firemné školenia na mieru
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Praktické workshopy s live coding
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm">
                Aktuálne technológie a best practices
              </ListItem>
              <ListItem className="text-xs sm:text-sm md:text-sm" marker="☝🏽">
                Skupinové aj individuálne formáty
              </ListItem>
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
});

export default References;
