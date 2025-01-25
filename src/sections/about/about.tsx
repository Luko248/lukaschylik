import { component$ } from "@builder.io/qwik";
import { Container, Section, Skills } from "~/components";

const About = component$(() => {
  return (
    <>
      <Section id="about-me">
        <Container size="full" className="relative z-10 isolate text-left">
          <div class="grid grid-cols-[5fr_8fr] gap-[10svi]">
            <div class="content-fade-in">
              <h2 class="text-[clamp(3rem,14svb,10rem)] mb-80 font-extrabold uppercase leading-none text-black tracking-widest relative color-transparent content-fade-in">
                About me
              </h2>
              <p class="text-xl leading-relaxed font-light mb-32  text-white">
                I'm a front-end developer specializing in{" "}
                <strong class="text-black bg-yellow-500 font-medium ">
                  visual logic
                </strong>
                . With 8 years of experience and numerous projects under my
                belt, I've worked on everything from presentation websites to
                web applications, PWAs, and complex information systems. These
                experiences have given me a broad understanding of{" "}
                <strong class="text-black bg-yellow-500 font-medium">
                  UI-UX design, web accessibility, performance and SEO
                </strong>
                . Currently, I focus on implementing design systems.
              </p>
              <p class="text-xl leading-relaxed ont-light mb-80 text-white">
                I also assist developers in selecting the right technology for
                the visual aspects of their projects and offer{" "}
                <strong class="text-black bg-yellow-500 font-medium">
                  consultations, workshops, and training
                </strong>{" "}
                in this area.
              </p>
            </div>
            <div>
              <img
                class="me block mx-auto"
                src="/images/me.webp"
                alt="The picture of me"
                loading="lazy"
                width={768}
                height={768}
              />
            </div>
          </div>
          {/* <h3 class="text-6xl leading-relaxed font-bold mb-16">Skills</h3> */}
        </Container>
        <Skills />
      </Section>
    </>
  );
});

export default About;
