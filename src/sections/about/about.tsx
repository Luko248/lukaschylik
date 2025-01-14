import { component$, Slot } from "@builder.io/qwik";
import Container from "../../components/container/container";
import Skills from "~/components/skills/skills";

const About = component$(() => {
  return (
    <>
      <section id="about-me" class="relative text-white min-h-screen bg-black">
        <h2 class="text-8xl uppercase font-bold tracking-widest">About me</h2>

        <Container size="lg" className="relative z-10 isolate mb-80">
          <p class="text-xl leading-relaxed font-light mb-32">
            I'm a front-end developer specializing in{" "}
            <strong class="text-black bg-yellow font-medium">
              visual logic
            </strong>
            . With 8 years of experience and numerous projects under my belt,
            I've worked on everything from presentation websites to web
            applications, PWAs, and complex information systems. These
            experiences have given me a broad understanding of{" "}
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
          <h3 class="text-6xl leading-relaxed font-bold mb-16">Skills</h3>
        </Container>
        {/* <Skills /> */}
      </section>
    </>
  );
});

export default About;
