import { component$ } from "@builder.io/qwik";
import Container from "~/components/container/container";
import Reference from "~/components/reference/reference";
import stylex, { create } from "@stylexjs/stylex";
import { color } from "../vars.stylex";
import Intro from "~/sections/intro/intro";

const moveToTop = stylex.keyframes({
  from: { translate: "-50% calc(-50svb + 100%)" },
  "30%, 70%": { opacity: 1 },
  to: { translate: "-50% calc(50svb - 100%)" },
});

const STYLE = create({
  section: {
    minBlockSize: "100svb",
    position: "relative",
    color: color.black,
    borderBlock: "1px solid #000",
    paddingBlock: "clamp(2rem, 10svb, 8rem)",
    backgroundColor: color.black,
  },
  sectionTitle: {
    position: "absolute",
    inset: "50% auto auto 50%",
    fontSize: "clamp(4.5rem, 35svb, 16rem)",
    textTransform: "uppercase",
    fontWeight: "900",
    letterSpacing: "0.1em",
    color: `hsl(from ${color.white} h s l / 0)`,
    opacity: 0,
    translate: "-50% calc(-50svb + 100%)",
    animationName: moveToTop,
    animationFillMode: "forwards",
    animationTimingFunction: "linear",
    animationDuration: "5s",
    animationTimeline: "view()",
    animationRangeStart: "contain",
    animationRangeEnd: "contain",
  },
  references: {
    display: "grid",
    gridTemplateColumns: "5fr 8fr",
    gap: "clamp(1rem, 4svi, 3rem)",
    backgroundColor: color.black,
    isolation: "isolate",
  },
  referenceLIst: {
    backgroundColor: color.black,
    listStyle: "none",
    padding: 0,
    margin: 0,
  }
});

export default component$(() => {
  return (
    <>
      <Intro />
      <section id="skills" {...stylex.props(STYLE.section)}>
        <Container>
          <h2 {...stylex.props(STYLE.sectionTitle)}>Skills</h2>
        </Container>
      </section>
      <section id="reference" {...stylex.props(STYLE.section)}>
        <Container size="lg">
          <h2 {...stylex.props(STYLE.sectionTitle)}>Reference</h2>
          <div {...stylex.props(STYLE.references)}>
            <div></div>
            <ul {...stylex.props(STYLE.referenceLIst)}>
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="updateconference.net"
              webURL="https://www.updateconference.net/en/"
              year="2018"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="thelucie.ink"
              webURL="https://thelucie.ink/"
              year="2022"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Riganti"
              webURL="https://www.riganti.cz/"
              year="2021"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="Brand Design"
              webURL="https://brand-design.cz/"
              year="2017"
            />
            <Reference
              src="/images/logos/references/logo-riganti.svg"
              title="IVPA Okná"
              webURL="https://ivpaokna.sk/"
              year="2018"
            />
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
});
