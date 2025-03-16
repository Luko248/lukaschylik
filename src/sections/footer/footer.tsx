import { component$ } from "@builder.io/qwik";
import { Container } from "~/components";

const Footer = component$(() => {
  return (
    <footer class="bg-black text-white py-8">
      <Container size="full" className="relative z-10 isolate grid gap-5 ">
        <div>
          <h3 class="mb-5 text-2xl font-bold">Kontaktné údaje</h3>
          <address class="font-mono">
            Lukáš Chylík
            <br />
            Hybešova 308/61, 602 00 Brno
            <br />
            Česká republika
            <br />
            <br />
            <span>
              <strong>IČO: </strong>
              05483247
            </span>
            <br />
            <span>
              <b>Email: </b>
              <a
                class="hover:underline"
                href="mailto:chylik.lukas@gmail.com"
                role="internal"
                rel="noreferer">
                chylik.lukas@gmail.com
              </a>
            </span>
          </address>
          <small class=" leading-relaxed font-light font-mono mt-4 block">
            ©{new Date().getFullYear()} Všetky práva vyhradené.
          </small>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
