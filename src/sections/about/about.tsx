import { component$, Slot } from "@builder.io/qwik";
import Container from "../../components/container/container";
import Button from "../../components/button/button";

const About = component$(() => {
  return (
    <section class="text-white min-h-screen" id="about-me">
      <Container size="lg" className="relative z-10 isolate">
        <h2 class="text-8xl uppercase mb-56 font-bold tracking-widest">
          About me
        </h2>
        <p class="text-xl leading-relaxed font-light mb-32">
          I'm a front-end developer specializing in{" "}
          <strong class="text-black bg-yellow font-medium">visual logic</strong>
          . With 8 years of experience and numerous projects under my belt, I've
          worked on everything from presentation websites to web applications,
          PWAs, and complex information systems. These experiences have given me
          a broad understanding of{" "}
          <strong class="text-black bg-yellow font-medium">
            UI-UX design, web accessibility, performance and SEO
          </strong>
          . Currently, I focus on implementing design systems.
        </p>
        <p class="text-xl leading-relaxed ont-light mb-32">
          I also assist developers in selecting the right technology for the
          visual aspects of their projects and offer{" "}
          <strong class="text-black bg-yellow font-medium">
            consultations, workshops, and training
          </strong>{" "}
          in this area.
        </p>
        <p class="text-xl leading-relaxed ont-light mb-16">
          My skills include:
        </p>
        <ul class="flex flex-wrap gap-16 m-0">
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            HTML
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            CSS
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            JavaScript
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            TypeScript
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            React
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Astro
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Qwik
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            AMP
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Tailwind
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Stylex
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            SCSS
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Sass
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            Less
          </li>
          <li class="inline-block border border-white px-16 leading-normal py-4 text-xl">
            PostCSS
          </li>
        </ul>
      </Container>
    </section>
  );
});

export default About;
