import { component$ } from "@builder.io/qwik";
import { Container } from "~/components";

const Footer = component$(() => {
  return (
    <footer class="bg-black text-white">
      <Container size="full" className="relative z-10 isolate">
        <div class="grid grid-cols-1 gap-6">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-l lg:text-xl leading-relaxed font-light mb-18 font-mono">
                © 2016 - {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div>
              <a
                href="#"
                class="text-white
                hover:text-primary
                transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
